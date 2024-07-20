import Sidebar from "../components/Sidebar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import { useState } from "react";
import { useConversation } from "../context/conversationContext.jsx";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { selectedConversation } = useConversation();

  const messages = [
    { id: 1, sender: 'Alice', content: 'Hey Bob, how\'s it going?', isUser: false },
    { id: 2, sender: 'Bob', content: 'Hi Alice! I\'m doing great, thanks for asking. How about you?', isUser: true },
    { id: 3, sender: 'Alice', content: 'I\'m good too! Just finished a big project at work.', isUser: false },
    { id: 4, sender: 'Bob', content: 'That\'s awesome! Congratulations on completing the project. How do you feel?', isUser: true },
    { id: 5, sender: 'Alice', content: 'Thanks! I feel relieved and proud. It was challenging but worth it.', isUser: false },
    { id: 6, sender: 'Bob', content: 'You should be proud! Hard work always pays off. Are you planning to celebrate?', isUser: true },
    { id: 7, sender: 'Alice', content: 'Yes, I\'m thinking of treating myself to a nice dinner this weekend. Want to join?', isUser: false },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 animate-gradient-x animate-[15s_ease-in-out_infinite]">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <ChatArea
        messages={messages}
        currentContact={selectedConversation}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
}

export default Home



