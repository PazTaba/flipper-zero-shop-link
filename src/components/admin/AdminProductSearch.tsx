
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const AdminProductSearch = ({ value, onChange }: Props) => {
  const { t } = useLanguage();
  return (
    <div className="relative flex-1">
      <Input
        placeholder={t("admin.searchProducts")}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-flipper-dark/70 border-flipper-purple/30 pl-10"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search size={16} />
      </div>
    </div>
  );
};
export default AdminProductSearch;
