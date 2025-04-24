
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
        const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
        const adminEmail = localStorage.getItem("adminEmail");
        
        if (!isLoggedIn || !adminEmail) {
          // אם אין מידע התחברות ב-localStorage, המשתמש לא מחובר
          localStorage.removeItem("adminLoggedIn");
          localStorage.removeItem("adminEmail");
          navigate("/admin");
          return;
        }
        
        // בדיקה שהמשתמש קיים במערכת בלי לבדוק סיסמה
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', adminEmail);
        
        if (error || !data || data.length === 0) {
          // אם יש שגיאה או שהמשתמש לא נמצא, המשתמש לא מחובר
          console.error("Error verifying admin access:", error);
          localStorage.removeItem("adminLoggedIn");
          localStorage.removeItem("adminEmail");
          navigate("/admin");
          
          if (error) {
            toast({
              title: "שגיאת אימות",
              description: "אירעה שגיאה במהלך אימות המשתמש",
              variant: "destructive",
            });
          }
        } else {
          // המשתמש קיים, אפשר להמשיך
          setIsCheckingAuth(false);
        }
      } catch (error) {
        console.error("Error in auth check:", error);
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminEmail");
        navigate("/admin");
        
        toast({
          title: "שגיאת מערכת",
          description: "אירעה שגיאה בבדיקת ההרשאות",
          variant: "destructive",
        });
      }
    };
    
    checkAdminAccess();
  }, [navigate, toast]);
  
  // אם עדיין בודקים הרשאות, מציגים מסך טעינה ריק
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
