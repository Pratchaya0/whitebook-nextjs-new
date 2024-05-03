import AddProductForm from "@/components/admin/products/add-product-form";
import ProductsTable from "@/components/admin/products/table";

const ProductsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      <ProductsTable />
    </div>
  );
};

export default ProductsPage;
