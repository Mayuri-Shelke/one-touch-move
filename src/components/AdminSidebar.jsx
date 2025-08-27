import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="h-screen w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-6">OneTouchMove</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/admin" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/admin/users" className="hover:text-yellow-300">Manage Users</Link>
        <Link to="/admin/physiotherapists" className="hover:text-yellow-300">Manage Physiotherapists</Link>
        <Link to="/admin/appointments" className="hover:text-yellow-300">Manage Appointments</Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
