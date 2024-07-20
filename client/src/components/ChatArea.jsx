import { IoMenuOutline, IoCallOutline, IoVideocamOutline } from 'react-icons/io5';
import { useConversation } from "../context/conversationContext.jsx";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '../context/authContext.jsx';


const ChatArea = ({ toggleSidebar }) => {
    const { messages, setMessages, selectedConversation } = useConversation();
    const [message, setMessage] = useState({ message: '' });

    const { user } = useUser();

    const handleMessage = (e) => {
        setMessage({ message: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.message.trim()) return; // Prevent sending empty messages

        try {
            const res = await fetch(`/server/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
            const data = await res.json();
            if (!data.success && data.success !== undefined) {
                throw new Error(data.message);
            }
            setMessage({ message: '' }); // Clear the input after sending

        } catch (error) {
            toast.error(error.message);
        }
    }

    const getMessage = async () => {
        try {
            const res = await fetch(`/server/messages/${selectedConversation._id}`);
            const data = await res.json();
            if (!data.success && data.success !== undefined) {
                throw new Error(data.message);
            }
            setMessages(data);
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        getMessage();
    },[selectedConversation])


    if (selectedConversation === undefined) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (selectedConversation === null) {
        return <div>No contact selected</div>;
    }

    return (
        <div className="flex-1 bg-slate-900 flex flex-col">
            {/* Chat Header */}
            <header className="bg-slate-800 p-4 text-gray-200 border-b border-slate-600 flex items-center justify-between h-20">
                <div className="flex items-center">
                    <button
                        className="mr-4 md:hidden p-2 rounded-md bg-slate-700 text-gray-300 hover:bg-slate-600"
                        onClick={toggleSidebar}
                    >
                        <IoMenuOutline size={24} />
                    </button>
                    <div className="flex items-center">
                        <img
                            src={selectedConversation.profilePic}
                            alt={`${selectedConversation.username} Avatar`}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <h1 className="text-xl font-semibold">{selectedConversation.username}</h1>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full bg-slate-700 text-gray-300 hover:bg-slate-600">
                        <IoCallOutline size={24} />
                    </button>
                    <button className="p-2 rounded-full bg-slate-700 text-gray-300 hover:bg-slate-600">
                        <IoVideocamOutline size={24} />
                    </button>
                </div>
            </header>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-4">
                {messages.map((message) => (
                    <div key={message._id} className={`flex mb-4 ${message.senderId === user._id ? 'justify-end' : ''}`}>
                        {message.senderId === selectedConversation._id && (
                            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                <img src={selectedConversation.profilePic} alt={`${selectedConversation.username} Avatar`} className="w-8 h-8 rounded-full" />
                            </div>
                        )}
                        <div className={`flex max-w-96 ${message.senderId===user._id ? 'bg-indigo-600' : 'bg-slate-800'} rounded-lg p-3 gap-3`}>
                            <p className="text-gray-200">{message.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <footer className="bg-slate-800 border-t border-slate-600 p-4 h-20">
                <form onSubmit={handleSubmit} className="flex items-center w-full">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full p-2 rounded-md border border-slate-600 bg-slate-700 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id='message'
                        value={message.message}
                        onChange={handleMessage}
                    />
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Send
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default ChatArea;