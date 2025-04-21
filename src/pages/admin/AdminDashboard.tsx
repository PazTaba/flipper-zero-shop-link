
import Dashboard from "@/components/admin/Dashboard";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminDashboard = () => {
  const { dir } = useLanguage();
  
  return (
    <div className="pb-16 md:pb-0" dir={dir}>
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
