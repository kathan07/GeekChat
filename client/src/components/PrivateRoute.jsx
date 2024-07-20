import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from "../context/authContext";

export default function PrivateRoute() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    // You can return a loading spinner or any placeholder here
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to='/login' />;
}