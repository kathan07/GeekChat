import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { useUser } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useConversation } from "../context/conversationContext.jsx";
import { useSocketContext } from "../context/socketContext.jsx";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setloading] = useState(false);
  const { clearUser } = useUser();
  const navigate = useNavigate();
  const [cloading, setcloading] = useState(false);
  const [contacts, setContacts] = useState(null);
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { onlineUsers } = useSocketContext();

  const logout = async () => {
    setloading(true);
    try {
      const res = await fetch("/server/auth/logout");
      const data = await res.json();
      if (!data.success && data.success !== undefined) {
        throw new Error(data.message);
      }
      clearUser();
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  const getConversation = async () => {
    setcloading(true);
    try {
      const res = await fetch("/server/user");
      const data = await res.json();
      if (!data.success && data.success !== undefined) {
        throw new Error(data.message);
      }
      setContacts(data);
      if (data.length > 0) {
        setSelectedConversation(data[0]); // Assuming each contact has an _id
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setcloading(false);
    }
  };

  const search = async (e) => {
    if (e.key === "Enter") {
      setIsSearching(true);
      setSearchResults(null);

      // Simulate an async operation (you can remove this if your actual search is async)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const results = contacts.filter(
        (contact) =>
          contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(results);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    getConversation();

  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-80 bg-slate-800 border-r border-slate-600 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col`}
    >
      {/* Sidebar Header */}
      <header className="p-4 bg-slate-800 text-gray-200 h-20 mt-2 ml-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold truncate">
            Chat<span className="text-blue-300">App</span>
          </h1>
          <button
            className="md:hidden p-2 rounded-md bg-slate-700 text-gray-300 hover:bg-slate-600"
            onClick={toggleSidebar}
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={search}
          className="w-full p-2 rounded-md border border-slate-600 bg-slate-700 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      {/* Contact List */}
      <div className="overflow-y-auto flex-grow p-3">
        {isSearching ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : searchResults !== null ? (
          searchResults.length > 0 ? (
            searchResults.map((contact) => (
              <div
                key={contact._id}
                className={`flex items-center mb-4 cursor-pointer p-2 rounded-md transition-colors duration-200 ${selectedConversation._id === contact._id
                    ? "bg-slate-600 hover:bg-slate-500"
                    : "hover:bg-slate-700"
                  }`}
                onClick={() => setSelectedConversation(contact)}
              >
                <div className="w-10 h-10 bg-slate-600 rounded-full mr-3 flex-shrink-0">
                  <img
                    src={contact.profilePic}
                    alt={`${contact.username} Avatar`}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-gray-200 truncate">
                    {contact.username}
                  </h2>
                  <p className="text-sm text-gray-400 truncate">
                    {contact.fullName}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No such user exists</div>
          )
        ) : cloading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : contacts && contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className={`flex items-center mb-4 cursor-pointer p-2 rounded-md transition-colors duration-200 ${selectedConversation._id === contact._id
                  ? "bg-slate-600 hover:bg-slate-500"
                  : "hover:bg-slate-700"
                }`}
              onClick={() => setSelectedConversation(contact)}
            >
              <div className="w-10 h-10 bg-slate-600 rounded-full mr-3 flex-shrink-0">
                <img
                  src={contact.profilePic}
                  alt={`${contact.username} Avatar`}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-gray-200 truncate">
                  {onlineUsers.includes(contact._id) && (
                    <span className="text-xs bg-green-500 text-slate-800 px-1.5 py-0.5 rounded-full">
                      Online
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-400 truncate">
                  {contact.fullName}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No contacts found</div>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-6 h-16 mb-2">
        <button
          className="flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-200"
          onClick={logout}
        >
          <IoLogOutOutline size={30} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
