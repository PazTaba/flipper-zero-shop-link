
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from "dompurify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, dir } = useLanguage();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sanitizeInput = (input: string): string => {
    return DOMPurify.sanitize(input.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const sanitizedEmail = sanitizeInput(email);
      
      if (!validateEmail(sanitizedEmail)) {
        throw new Error(t("admin.invalidEmail"));
      }

      const { data: isValid, error: verificationError } = await supabase.rpc(
        'verify_admin_credentials',
        { 
          admin_email: sanitizedEmail,
          admin_password: password 
        }
      );

      if (verificationError) throw verificationError;

      if (isValid) {
        // Set login state in localStorage
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminEmail", sanitizedEmail);
        
        toast({
          title: t("admin.loginSuccessful"),
          description: t("admin.welcomeMessage"),
          variant: "default",
        });
        
        // Navigate to dashboard with a delay to ensure local storage is updated
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 100);
      } else {
        throw new Error(t("admin.invalidCredentials"));
      }
    } catch (error: any) {
      toast({
        title: t("admin.loginFailed"),
        description: error.message || t("admin.invalidCredentials"),
        variant: "destructive",
      });
      
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-flipper-dark/70 border-flipper-purple/30 pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-flipper-purple"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full btn-tech" 
            disabled={loading}
          >
            {loading ? t("admin.signingIn") : t("admin.login")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
