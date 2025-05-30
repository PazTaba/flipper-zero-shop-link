
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validateEmail(email)) {
        toast({
          title: t("admin.loginFailed"),
          description: t("admin.invalidEmail"),
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !session) {
        throw new Error("Invalid credentials");
      }

      toast({
        title: t("admin.loginSuccessful"),
        description: t("admin.welcomeMessage"),
      });

      setTimeout(() => navigate("/admin/dashboard"), 100);
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: t("admin.loginFailed"),
        description: error.message || t("admin.invalidCredentials"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("admin.password")}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full btn-tech" disabled={loading}>
            {loading ? t("admin.signingIn") : t("admin.login")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
