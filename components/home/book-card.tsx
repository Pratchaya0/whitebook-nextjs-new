"use client";

import { getListBooks } from "@/data/book";
import BookCardItem from "@/components/home/book-card-item";
import { useEffect, useState, useTransition } from "react";
import { Book } from "@prisma/client";
import PacmanLoader from "react-spinners/PacmanLoader";

const BookCard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isPending, startTransition] = useTransition();
  const fetchBooks = async () => {
    const data = await getListBooks();
    setBooks(data as Book[]);
  };

  useEffect(() => {
    startTransition(() => {
      fetchBooks();
    });
  }, []);

  return (
    <div className="p-8">
      {isPending && (
        <div className="h-[60vh] w-full flex justify-center items-center">
          <PacmanLoader color="#36d7b7" />
        </div>
      )}
      {!isPending && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {books &&
            books.map((book) => <BookCardItem key={book.id} book={book} />)}
        </div>
      )}
    </div>
  );
};

export default BookCard;
