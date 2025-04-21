
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

interface MultilangTextFormProps {
  value: { en: string; he: string };
  onChange: (val: { en: string; he: string }) => void;
  label: string;
}

function MultilangTextField({ value, onChange, label }: MultilangTextFormProps) {
  const { t } = useLanguage();

  return (
    <div className="mb-4">
      <label className="block font-bold mb-1">{label}</label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder={t("switchToEnglish")}
            value={value.en}
            onChange={e => onChange({ ...value, en: e.target.value })}
            className="mb-1"
          />
          <span className="text-xs text-gray-400">{t("switchToEnglish")}</span>
        </div>
        <div className="flex-1">
          <Input
            placeholder={t("switchToHebrew")}
            value={value.he}
            onChange={e => onChange({ ...value, he: e.target.value })}
            className="mb-1"
          />
          <span className="text-xs text-gray-400">{t("switchToHebrew")}</span>
        </div>
      </div>
    </div>
  );
}

type ProductFormState = {
  name: { en: string; he: string };
  description: { en: string; he: string };
  shortDescription: { en: string; he: string };
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
};

export default function AdminProductForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: Partial<ProductFormState>;
  onSave: (data: ProductFormState) => void;
  onCancel: () => void;
}) {
  const defaultFormState: ProductFormState = {
    name: { en: "", he: "" },
    description: { en: "", he: "" },
    shortDescription: { en: "", he: "" },
    price: 0,
    images: [],
    category: "device",
    inStock: true,
  };

  const [form, setForm] = useState<ProductFormState>(
    initialData ? { ...defaultFormState, ...initialData } : defaultFormState
  );
  
  const { t } = useLanguage();

  function handleInput(field: keyof ProductFormState, value: any) {
    setForm({ ...form, [field]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted with data:", form);
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <MultilangTextField
        value={form.name}
        onChange={val => handleInput("name", val)}
        label={t("admin.name")}
      />
      <MultilangTextField
        value={form.shortDescription}
        onChange={val => handleInput("shortDescription", val)}
        label={t("admin.shortDescription") || "Short Description"}
      />
      <MultilangTextField
        value={form.description}
        onChange={val => handleInput("description", val)}
        label={t("admin.description") || "Description"}
      />
      <div className="mb-4">
        <label className="block font-bold mb-1">{t("admin.price")}</label>
        <Input
          type="number"
          value={form.price}
          onChange={e => handleInput("price", parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">{t("admin.category")}</label>
        <select
          value={form.category}
          className="p-2 border rounded w-full bg-flipper-dark/60"
          onChange={e => handleInput("category", e.target.value)}
        >
          <option value="device">{t("nav.devices")}</option>
          <option value="accessory">{t("nav.accessories")}</option>
          <option value="bundle">{t("nav.bundles")}</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">{t("admin.status")}</label>
        <select
          value={form.inStock ? "in" : "out"}
          className="p-2 border rounded w-full bg-flipper-dark/60"
          onChange={e => handleInput("inStock", e.target.value === "in")}
        >
          <option value="in">{t("admin.productInStock")}</option>
          <option value="out">{t("admin.productOutOfStock")}</option>
        </select>
      </div>
      <div className="flex gap-4">
        <Button type="submit" className="btn-tech">{t("admin.save") || "Save"}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>{t("admin.cancel") || "Cancel"}</Button>
      </div>
    </form>
  );
}
