import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/authContext";

function Login() {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({});
  const [loading,setloading] = useState(false);
  const {user ,updateUser } = useUser();
  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const res = await fetch('/server/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.error) {
				throw new Error(data.error);
			}
      localStorage.setItem("chat-user", JSON.stringify(data));
      updateUser(data);
      navigate('/');
    } catch (error) {
        toast.error(error.message);
    } finally {
      setloading(false);
    }
    
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 animate-gradient-x animate-[15s_ease-in-out_infinite]">
      <div className="flex flex-col py-9 px-8  border-slate-400 shadow-2xl bg-slate-800 rounded-xl border-opacity-70 border">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
            Chat
            <span className="text-blue-300">App</span>
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-200"
                >
                  Username
                </label>
                <div className="mt-3">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-200 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your username"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-200"
                >
                  Password
                </label>
                <div className="mt-3">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-200 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                  don't have an account?
                  <Link
                    to="/signup"
                    className="font-medium p-2 text-blue-600 hover:text-blue-500"
                  >
                    create an account
                  </Link>
                </p>
                <button
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
