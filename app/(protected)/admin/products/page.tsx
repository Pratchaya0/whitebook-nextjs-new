import AddDialogButton from "@/components/admin/add-dialog-button";
import ProductsTable from "@/components/admin/products/table";
import { getListBooks } from "@/data/book";
import { Book } from "@prisma/client";
import { useEffect, useState } from "react";

const ProductsPage = async () => {
  return (
    <>
      <div className="flex items-center justify-between gap-x-8">
        <h2>Products Management</h2>
        <div>
          <AddDialogButton title="Add Product">
            <div>Hello</div>
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
