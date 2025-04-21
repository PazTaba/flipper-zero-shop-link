
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    
    if (!isLoggedIn) {
      // Redirect to login page
      navigate("/admin");
    }
  }, [navigate]);
  
  return (
    <div className="flex h-screen bg-flipper-dark">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
