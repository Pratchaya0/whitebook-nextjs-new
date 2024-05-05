import AddDialogButton from "@/components/admin/add-dialog-button";
import AddProductForm from "@/components/admin/products/add-product-form";
import ProductsTable from "@/components/admin/products/table";

const ProductsPage = async () => {
  return (
    <>
      <div className="flex items-center justify-between gap-x-8">
        <h2>Products Management</h2>
        <div>
          <AddDialogButton title="Add Product">
            <AddProductForm />
          </AddDialogButton>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <ProductsTable />
      </div>
    </>
  );
};

export default ProductsPage;
