
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const AdminLayout = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  useEffect(() => {
    const checkAdminAccess = async () => {
      const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
      const adminEmail = localStorage.getItem("adminEmail");
      
      if (!isLoggedIn || !adminEmail) {
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminEmail");
        navigate("/admin");
        return;
      }
      
      try {
        const { data: isValid } = await supabase.rpc(
          'verify_admin_credentials',
          { admin_email: adminEmail, admin_password: '' }
        );
        
        if (!isValid) {
          localStorage.removeItem("adminLoggedIn");
          localStorage.removeItem("adminEmail");
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error verifying admin access:", error);
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminEmail");
        navigate("/admin");
      }
    };
    
    checkAdminAccess();
  }, [navigate]);
  
  return (
    <div className="flex h-screen bg-flipper-dark overflow-hidden">
      {/* Mobile menu toggle */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50 bg-flipper-dark/80 text-flipper-purple hover:bg-flipper-purple/20"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu />
        </Button>
      )}
      
      {/* Sidebar with mobile support */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-40 md:relative md:translate-x-0`}>
        <AdminSidebar />
      </div>
      
      {/* Main content */}
      <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${isMobile && sidebarOpen ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
        {/* Close sidebar when clicking on content in mobile */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className={isMobile ? 'pt-10' : ''}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
