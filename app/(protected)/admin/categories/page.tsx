import CategoriesTable from "@/components/admin/categories/table";

const CategoriesPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <CategoriesTable />
      </div>
    </div>
  );
};

export default CategoriesPage;
