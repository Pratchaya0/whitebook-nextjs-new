import AddDialogButton from "@/components/admin/add-dialog-button";
import AddCategoryForm from "@/components/admin/categories/add-category-form";
import CategoriesTable from "@/components/admin/categories/table";

const CategoriesPage = async () => {
  return (
    <center>
      <div className="w-[650px] flex items-center justify-between gap-x-8">
        <h2>Categories Management</h2>
        <div>
          <AddDialogButton title="Add Category">
            <AddCategoryForm />
          </AddDialogButton>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <CategoriesTable />
      </div>
    </center>
  );
};

export default CategoriesPage;
