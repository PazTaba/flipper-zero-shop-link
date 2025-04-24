
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "paz@gmail.com";

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
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
          throw new Error("No valid session");
        }

        if (user.email !== ADMIN_EMAIL) {
          throw new Error("Not authorized");
        }

      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/admin/login");

        toast({
          title: "Authentication Error",
          description: "Access denied",
          variant: "destructive",
        });
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAdminAccess();
  }, [navigate, toast]);

  if (isCheckingAuth) {
    return <div className="h-screen w-full flex items-center justify-center bg-flipper-dark">
      <div className="animate-pulse text-flipper-purple">טוען...</div>
    </div>;
  }

  return (
    <div className="flex h-screen bg-flipper-dark overflow-hidden">
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu />
        </Button>
      )}
      <div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 fixed inset-y-0 left-0 z-40 md:relative md:translate-x-0`}>
        <AdminSidebar />
      </div>
      <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${isMobile && sidebarOpen ? "opacity-50" : "opacity-100"} transition-opacity duration-300`}>
        {isMobile && sidebarOpen && <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setSidebarOpen(false)} />}
        <div className={isMobile ? "pt-10" : ""}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
