import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, dir } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email.includes("admin") && password.length > 0) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
          variant: "default",
        });

        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md w-full mx-auto" dir={dir}>
      <div className="tech-container p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-flipper-purple rounded-md flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            F0
          </div>
          <h2 className="text-2xl font-heading font-bold">{t("admin.portal")}</h2>
          <p className="text-gray-400 mt-2">{t("admin.signin")}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">{t("admin.email")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="bg-flipper-dark/70 border-flipper-purple/30"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">{t("admin.password")}</Label>
              <a href="#" className="text-sm text-flipper-purple hover:underline">
                {t("admin.forgotPassword")}
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-flipper-dark/70 border-flipper-purple/30"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full btn-tech" 
            disabled={loading}
          >
            {loading ? t("admin.signingIn") : t("admin.login")}
          </Button>
          
          <div className="text-center text-sm text-gray-400">
            <p>{t("admin.demoCredentials")}</p>
            <p>Email: admin@example.com</p>
            <p>Password: password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
