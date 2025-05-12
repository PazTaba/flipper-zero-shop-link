// src/components/LanguageSwitcher.tsx
import { useState } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (lang: "en" | "he") => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-200 hover:text-flipper-purple hover:bg-flipper-purple/5 rounded-md"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-flipper-dark border border-flipper-purple/20 p-1 w-32"
      >
        <DropdownMenuItem
          className={cn(
            "flex items-center gap-2 py-2 px-3 cursor-pointer",
            language === "en"
              ? "bg-flipper-purple/10 text-flipper-purple"
              : "text-gray-300 hover:text-white hover:bg-flipper-purple/5"
          )}
          onClick={() => handleLanguageChange("en")}
        >
          <span className="text-sm">English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "flex items-center gap-2 py-2 px-3 cursor-pointer",
            language === "he"
              ? "bg-flipper-purple/10 text-flipper-purple"
              : "text-gray-300 hover:text-white hover:bg-flipper-purple/5"
          )}
          onClick={() => handleLanguageChange("he")}
        >
          <span className="text-sm">עברית</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;