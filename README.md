# GeekChat

GeekChat is a real-time chat application that allows users to send messages, and interact with each other in a seamless and engaging way with the help of AI recommandation system. This project was developed using modern web technologies, including React.js for the frontend and Node.js with Socket.IO for the backend.

## Features

- **Real-time Messaging**: Users can send and receive messages instantly in the chat rooms, with the messages being broadcast to all connected users in real-time.
- **User Presence Indicator**: The application displays the online/offline status of users.
- **Responsive Design**: The application is designed to work seamlessly on both desktop and mobile devices, providing a consistent and enjoyable user experience across different form factors.
- **Authentication**: Users can create accounts, log in, and manage their profiles.
- **AI Recommandation**: Users can get AI-powered recommendations for what to text next based on the recent messages in the chat room, helping to enhance the conversation flow and user experience.

## Technologies Used

- **Frontend**:
  - [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [Socket.IO-client](https://socket.io/docs/v4/client-api/) - A client-side library for real-time, bidirectional, and event-based communication.
  - [ContextApi]([https://redux.js.org/](https://legacy.reactjs.org/docs/context.html)) - A state management API for JavaScript apps.
  - [React Router](https://reactrouter.com/) - A library for handling client-side routing in React applications.
  - [Tailwind]() - A library for styling React components..
- **Backend**:
  - [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - [Socket.IO](https://socket.io/) - A library for real-time, bidirectional, and event-based communication.
  - [Express.js](https://expressjs.com/) - A minimal and flexible Node.js web application framework.
  - [MongoDB](https://www.mongodb.com/) - A NoSQL database for storing user accounts, chat room data, and message history.
  - [JWT (JSON Web Tokens)](https://jwt.io/) - An open standard for securely transmitting information between parties as a JSON object.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above)
- [MongoDB](https://www.mongodb.com/) (for the backend)

### Installation and Make it run 

1. Clone the repository:

   ```bash
   git clone https://github.com/kathan07/GeekChat.git

2. Create .env file

   ```bash
   touch .env
   
3. Add Environment Variables:
   
   ```bash
   JWT_SECRET = ""
    PORT = 
    MONGO_URL = ""
    API_KEY = ""

5. Install node modules
   
   ```bash
   npm i

7. Run the server
   
   ```bash
   npm run dev

8. For Client

   ```bash
   cd client/.
   npm i
   npm run dev

   
