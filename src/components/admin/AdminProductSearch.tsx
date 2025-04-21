
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const AdminProductSearch = ({ value, onChange }: Props) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <div className="relative flex-1">
      <Input
        placeholder={isMobile ? t("admin.search") : t("admin.searchProducts")}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-flipper-dark/70 border-flipper-purple/30 pl-8 md:pl-10 text-sm h-9 md:h-10"
      />
      <div className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search size={isMobile ? 14 : 16} />
      </div>
    </div>
  );
};
export default AdminProductSearch;
