
import ProductsTable from "@/components/admin/products/table";
import { getListBooks } from "@/data/book";
import { Book } from "@prisma/client";
import { useEffect, useState } from "react";

const ProductsPage = async () => {
  const books = await getListBooks(true);

  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      <ProductsTable books={books as Book[]}/>
    </div>
  );
};

export default ProductsPage;
