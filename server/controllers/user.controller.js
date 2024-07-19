import User from "../models/user.model.js";
import mongoose from "mongoose";

async function getAllUsersWithRecentConversations(currentUserId) {
  try {
    const users = await User.aggregate([
      // Match all users except the current user
      { $match: { _id: { $ne: currentUserId } } },

      // Lookup the most recent conversation with the current user
      {
        $lookup: {
          from: "conversations",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ["$$userId", "$participants"] },
                    {
                      $in: [
                        new mongoose.Types.ObjectId(currentUserId),
                        "$participants",
                      ],
                    },
                  ],
                },
              },
            },
            { $sort: { updatedAt: -1 } },
            { $limit: 1 },
          ],
          as: "recentConversation",
        },
      },

      // Add fields for sorting without changing the original user document
      {
        $addFields: {
          lastConversationDate: {
            $ifNull: [
              { $arrayElemAt: ["$recentConversation.updatedAt", 0] },
              null,
            ],
          },
          hasConversation: {
            $cond: [
              { $gt: [{ $size: "$recentConversation" }, 0] },
              true,
              false,
            ],
          },
        },
      },

      // Sort: users with conversations first, then by conversation recency, then by username
      {
        $sort: {
          hasConversation: -1,
          lastConversationDate: -1,
          username: 1,
        },
      },

      // Remove the recentConversation field as it's no longer needed and exclude the password field
      {
        $project: {
          recentConversation: 0,
          password: 0, // Exclude the password field
        },
      },
    ]);

    return users;
  } catch (error) {
    console.error("Error in getAllUsersWithRecentConversations:", error);
    throw error;
  }
}

export const getUsersForSidebar = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await getAllUsersWithRecentConversations(
      loggedInUserId
    );
    res.status(200).json(filteredUsers);
  } catch (error) {
    next(error);
  }
};
