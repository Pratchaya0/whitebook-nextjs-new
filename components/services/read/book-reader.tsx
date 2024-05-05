"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getBookByBookIdAndUserId } from "@/data/book";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Book } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { FaGrinBeamSweat } from "react-icons/fa";
import { ReactReader } from "react-reader";

interface BookReaderProps {
  bookId: string;
}

const BookReader = ({ bookId }: BookReaderProps) => {
  const user = useCurrentUser();
  const [book, setBook] = useState<Book>();
  const [isPending, startTransition] = useTransition();
  const fetchBook = async () => {
    const data = await getBookByBookIdAndUserId(bookId, user?.id as string);
    setBook(data as Book);
  };
  const [location, setLocation] = useState<string | number>(0);

  useEffect(() => {
    startTransition(() => {
      fetchBook();
    });
  }, []);

  if (!book && isPending) {
    return (
      <Alert variant="destructive">
        <FaGrinBeamSweat className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your don't have permission</AlertDescription>
      </Alert>
    );
  } else if (book && !isPending) {
    return (
      <div style={{ height: "75vh" }}>
        <ReactReader
          url={book.bookUrl as string}
          location={location}
          locationChanged={(epubcfi: string) => setLocation(epubcfi)}
        />
      </div>
    );
  }
};

export default BookReader;
