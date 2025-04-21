
import Dashboard from "@/components/admin/Dashboard";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminDashboard = () => {
  const { dir } = useLanguage();
  
  return (
    <div dir={dir}>
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
