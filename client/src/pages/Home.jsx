import Sidebar from "../components/Sidebar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cloading, setcloading] = useState(false);

  const getConversation = async () => {
    setcloading(true);
    try {
      const res = await fetch('/server/user');
      const data = await res.json();
      if (!data.success && data.success !== undefined) {
				throw new Error(data.message);
			}
    } catch (error) {
      toast.error(error.message);
    } finally {
      setcloading(false);
    }
  }

  useEffect(() => {
    getConversation();
  }, []);


  const contacts = [
    { id: 1, name: 'Alice', message: 'Hoorayy!!', avatar: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
    { id: 2, name: 'Bob', message: 'How are you?', avatar: 'https://placehold.co/200x/a8d5ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
    { id: 3, name: 'Charlie', message: 'See you later!', avatar: 'https://placehold.co/200x/ffd5a8/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
    { id: 4, name: 'Diana', message: 'Thanks for your help!', avatar: 'https://placehold.co/200x/a8ffc9/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
    { id: 5, name: 'Ethan', message: 'Let\'s catch up soon', avatar: 'https://placehold.co/200x/d7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
  ];

  const messages = [
    { id: 1, sender: 'Alice', content: 'Hey Bob, how\'s it going?', isUser: false },
    { id: 2, sender: 'Bob', content: 'Hi Alice! I\'m doing great, thanks for asking. How about you?', isUser: true },
    { id: 3, sender: 'Alice', content: 'I\'m good too! Just finished a big project at work.', isUser: false },
    { id: 4, sender: 'Bob', content: 'That\'s awesome! Congratulations on completing the project. How do you feel?', isUser: true },
    { id: 5, sender: 'Alice', content: 'Thanks! I feel relieved and proud. It was challenging but worth it.', isUser: false },
    { id: 6, sender: 'Bob', content: 'You should be proud! Hard work always pays off. Are you planning to celebrate?', isUser: true },
    { id: 7, sender: 'Alice', content: 'Yes, I\'m thinking of treating myself to a nice dinner this weekend. Want to join?', isUser: false },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 animate-gradient-x animate-[15s_ease-in-out_infinite]">
      <Sidebar
        contacts={contacts}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <ChatArea
        messages={messages}
        currentContact={contacts[0]}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
}

export default Home



