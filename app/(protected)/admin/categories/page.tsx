import AddDialogButton from "@/components/admin/add-dialog-button";
import AddCategoryForm from "@/components/admin/categories/add-category-form";
import CategoriesTable from "@/components/admin/categories/table";
import { getListCategories } from "@/data/category";
import { Category } from "@prisma/client";

const CategoriesPage = async () => {
  return (
    <>
      <div className="flex items-center justify-between gap-x-8">
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
    </>
  );
};

export default CategoriesPage;
