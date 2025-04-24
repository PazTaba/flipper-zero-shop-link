import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

const AdminLayout = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  useEffect(() => {
    const checkAdminAccess = async () => {
      setIsCheckingAuth(true);
      
      try {
        const accessToken = Cookies.get('admin_access_token');
        
        if (!accessToken) {
          throw new Error('No access token found');
        }

        const { data: { user } } = await supabase.auth.getUser(accessToken);
        
        if (!user) {
          throw new Error('Invalid session');
        }

        // Verify admin status
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', user.email)
          .limit(1);

        if (adminError || !adminData || adminData.length === 0) {
          throw new Error('Not authorized as admin');
        }

      } catch (error) {
        console.error("Auth check error:", error);
        Cookies.remove('admin_access_token');
        navigate("/admin/login");
        
        toast({
          title: "Authentication Error",
          description: "Please log in again",
          variant: "destructive",
        });
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAdminAccess();
  }, [navigate, toast]);

  // If still checking permissions, show empty loading screen
  if (isCheckingAuth) {
    return <div className="h-screen w-full flex items-center justify-center bg-flipper-dark">
      <div className="animate-pulse text-flipper-purple">טוען...</div>
    </div>;
  }
  
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
