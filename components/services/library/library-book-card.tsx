"use client";
import { getListBooksByUserId } from "@/data/book";
import { useEffect, useState } from "react";
import { Book } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";
import LibraryBookCardItem from "@/components/services/library/library-book-card-item";

const LibraryBookCard = () => {
  const user = useCurrentUser();
  const [books, setBooks] = useState<Book[]>([]);
  const fetchBook = async () => {
    const data = await getListBooksByUserId(user?.id as string);
    setBooks(data as Book[]);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {books &&
          books.map((book) => (
            <LibraryBookCardItem key={book.id} book={book} />
          ))}
      </div>
    </div>
  );
};

export default LibraryBookCard;
