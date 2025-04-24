
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Edit, Trash2, Image } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  products: Product[];
  onEdit: (prod: Product) => void;
  onDelete: (id: string) => void;
  dir?: "ltr" | "rtl";
};

const AdminProductList = ({ products, onEdit, onDelete, dir }: Props) => {
  const { t, language } = useLanguage();

  return (
    <div className="border border-flipper-purple/30 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-flipper-dark/80 hover:bg-flipper-dark/90">
            <TableHead className="w-[80px]">{t("admin.image")}</TableHead>
            <TableHead>{t("admin.name")}</TableHead>
            <TableHead>{t("admin.price")}</TableHead>
            <TableHead>{t("admin.category")}</TableHead>
            <TableHead>{t("admin.status")}</TableHead>
            <TableHead className={`${dir === "rtl" ? "text-left" : "text-right"}`}>{t("admin.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id} className="hover:bg-flipper-purple/5">
              <TableCell>
                <div className="w-12 h-12 rounded overflow-hidden bg-flipper-dark/50">
                  <img src={product.images[0]} alt={product.name[language]} className="w-full h-full object-cover" />
                </div>
              </TableCell>
              <TableCell className="font-medium">{product.name[language]}</TableCell>
              <TableCell>{product.price.toFixed(2)} ₪</TableCell>
              <TableCell className="capitalize">{t(`nav.${product.category}s`)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${product.inStock
                  ? "bg-flipper-success/10 text-flipper-success"
                  : "bg-flipper-danger/10 text-flipper-danger"
                  }`}>
                  {product.inStock ? t("admin.productInStock") : t("admin.productOutOfStock")}
                </span>
              </TableCell>
              <TableCell className={`${dir === "rtl" ? "text-left" : "text-right"}`}>
                <div className={`flex ${dir === "rtl" ? "justify-start" : "justify-end"} gap-2`}>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-flipper-purple">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-flipper-purple" onClick={() => onEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-flipper-danger" onClick={() => onDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProductList;
