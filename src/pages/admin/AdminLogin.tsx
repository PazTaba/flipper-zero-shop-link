
import LoginForm from "@/components/admin/LoginForm";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminLogin = () => {
  const { dir } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-flipper-dark p-4" dir={dir}>
      <LoginForm />
    </div>
  );
};

export default AdminLogin;
