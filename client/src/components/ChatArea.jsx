import { IoMenuOutline, IoCallOutline, IoVideocamOutline } from 'react-icons/io5';

const ChatArea = ({ messages, currentContact, toggleSidebar }) => {
    return (
        <div className="flex-1 bg-slate-900 flex flex-col">
            {/* Chat Header */}
            <header className="bg-slate-800 p-4 text-gray-200 border-b border-slate-600 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        className="mr-4 md:hidden p-2 rounded-md bg-slate-700 text-gray-300 hover:bg-slate-600"
                        onClick={toggleSidebar}
                    >
                        <IoMenuOutline size={24} />
                    </button>
                    <div className="flex items-center">
                        <img
                            src={currentContact.avatar}
                            alt={`${currentContact.name} Avatar`}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <h1 className="text-xl font-semibold">{currentContact.name}</h1>
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
                    <div key={message.id} className={`flex mb-4 ${message.isUser ? 'justify-end' : ''}`}>
                        {!message.isUser && (
                            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                <img src={currentContact.avatar} alt={`${message.sender} Avatar`} className="w-8 h-8 rounded-full" />
                            </div>
                        )}
                        <div className={`flex max-w-96 ${message.isUser ? 'bg-indigo-600' : 'bg-slate-800'} rounded-lg p-3 gap-3`}>
                            <p className="text-gray-200">{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <footer className="bg-slate-800 border-t border-slate-600 p-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full p-2 rounded-md border border-slate-600 bg-slate-700 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Send
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChatArea;