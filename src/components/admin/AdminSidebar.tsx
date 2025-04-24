
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Folder,
  LayoutGrid,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminSidebar = () => {
  const location = useLocation();
  const { t, dir } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path;
  };



  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: "Logout Error",
        description: "Could not log out. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });

    window.location.href = "/admin/login";
  };


  return (
    <aside className="bg-flipper-dark/90 border-r border-flipper-purple/20 h-screen w-64 flex-shrink-0" dir={dir}>
      <div className="p-4 border-b border-flipper-purple/20 flex items-center gap-3">
        <div className="w-10 h-10 bg-flipper-purple rounded-md flex items-center justify-center text-white font-bold text-xl">
          F0
        </div>
        <div>
          <h2 className="text-lg font-semibold">Flipper Zero</h2>
          <p className="text-xs text-gray-400">{t("admin.portal")}</p>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${isActive("/admin/dashboard")
                ? "bg-flipper-purple/20 text-flipper-purple"
                : "hover:bg-flipper-purple/10 text-gray-300 hover:text-flipper-purple"
                }`}
            >
              <BarChart2 className="h-5 w-5" />
              <span>{t("admin.dashboard")}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${isActive("/admin/products")
                ? "bg-flipper-purple/20 text-flipper-purple"
                : "hover:bg-flipper-purple/10 text-gray-300 hover:text-flipper-purple"
                }`}
            >
              <LayoutGrid className="h-5 w-5" />
              <span>{t("admin.products")}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${isActive("/admin/categories")
                ? "bg-flipper-purple/20 text-flipper-purple"
                : "hover:bg-flipper-purple/10 text-gray-300 hover:text-flipper-purple"
                }`}
            >
              <Folder className="h-5 w-5" />
              <span>{t("admin.categories")}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${isActive("/admin/settings")
                ? "bg-flipper-purple/20 text-flipper-purple"
                : "hover:bg-flipper-purple/10 text-gray-300 hover:text-flipper-purple"
                }`}
            >
              <Settings className="h-5 w-5" />
              <span>{t("admin.settings")}</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-flipper-purple/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-md w-full text-gray-300 hover:text-flipper-danger hover:bg-flipper-danger/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>{t("admin.logout")}</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
