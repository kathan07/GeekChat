import Sidebar from "../components/Sidebar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import { useState } from "react";


function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 animate-gradient-x animate-[15s_ease-in-out_infinite]">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <ChatArea
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
}

export default Home



