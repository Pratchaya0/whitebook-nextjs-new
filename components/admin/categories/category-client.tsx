"use client";

import AddDialogButton from "@/components/admin/add-dialog-button";
import AddCategoryForm from "@/components/admin/categories/add-category-form";
import CategoriesTable from "@/components/admin/categories/table";
import { getListCategories } from "@/data/category";
import { Category } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";

const CategoriesClient = async () => {
  const [data, setData] = useState<Category[]>([]);
  const [isPending, startTransition] = useTransition();
  const fetchCategory = async () => {
    const data = await getListCategories();
    setData(data as Category[]);
  };

  useEffect(() => {
    startTransition(() => {
      fetchCategory();
    });
  }, []);

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

export default CategoriesClient;
