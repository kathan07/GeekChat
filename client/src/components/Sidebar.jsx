import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';
import { useUser } from "../context/authContext";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Sidebar = ({ contacts, isOpen, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setloading] = useState(false);
  const { clearUser } = useUser();
  const navigate = useNavigate();

  const logout = async () => {
    setloading(true);
    try {
      const res = await fetch('/server/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = res.json();
      if (!data.success && data.success !== undefined) {
				throw new Error(data.message);
			}
      clearUser();
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-800 border-r border-slate-600 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col`}>
      {/* Sidebar Header */}
      <header className="p-4 border-b border-slate-600 bg-slate-800 text-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold truncate">
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
          onChange={handleSearchChange}
          className="w-full p-2 rounded-md border border-slate-600 bg-slate-700 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      {/* Contact List */}
      <div className="overflow-y-auto flex-grow p-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center mb-4 cursor-pointer hover:bg-slate-700 p-2 rounded-md">
            <div className="w-10 h-10 bg-slate-600 rounded-full mr-3 flex-shrink-0">
              <img src={contact.avatar} alt={`${contact.name} Avatar`} className="w-full h-full rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-gray-200 truncate">{contact.name}</h2>
              <p className="text-sm text-gray-400 truncate">{contact.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-600">
        <button className="flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-200" onClick={logout}>
          <IoLogOutOutline size={20} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;