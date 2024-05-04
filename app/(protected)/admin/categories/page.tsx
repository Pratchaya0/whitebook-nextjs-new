import CategoriesTable from "@/components/admin/categories/table";
import { getListCategories } from "@/data/category";
import { Category } from "@prisma/client";

const CategoriesPage = async () => {
  const category = await getListCategories();
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <CategoriesTable categories={category as Category[]} />
      </div>
    </div>
  );
};

export default CategoriesPage;
