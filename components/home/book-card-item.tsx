"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book } from "@prisma/client";
import Image from "next/image";
import AddToCartButton from "@/components/home/add-to-cart-button";
import ViewAddDialogButton from "@/components/home/view-dialog-button";
import { Button } from "@/components/ui/button";
import { FaReadme, FaSistrix } from "react-icons/fa";
import { useEffect, useState, useTransition } from "react";
import { checkIfIsAvailableByBookId } from "@/data/bayer-book";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

interface BookCardItemProps {
  book: Book;
}

const BookCardItem = ({ book }: BookCardItemProps) => {
  const user = useCurrentUser();
  const [isYourOwnBook, setIsYourOwnBook] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const checkIsYourOwnBook = async () => {
    const data = await checkIfIsAvailableByBookId(book.id, user?.id as string);
    setIsYourOwnBook(data);
  };
  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
      checkIsYourOwnBook();
    });
  }, []);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>{book.name}</CardTitle>
        <CardDescription>{book.price} ฿</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center w-full gap-1">
          <div className="aspect-square overflow-hidden relative w-full">
            <Image
              fill
              className="w-full h-full object-contain"
              src={
                book.coverImageUrl as string
                // "https://firebasestorage.googleapis.com/v0/b/whitebook-411409.appspot.com/o/products%2F1705912339334-10002.jpg?alt=media&token=bb73ebcc-bbec-4532-827c-81213b01f0f3"
              }
              alt={book.name as string}
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px" // Add this prop with appropriate values
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isPending && (
          <div className="w-full flex justify-center items-center">
            Loading...
          </div>
        )}
        {!user && (
          <>
            <ViewAddDialogButton bookId={book.id as string} asChild>
              <div className="flex items-center w-full gap-x-2">
                <Button size="lg" className="w-full" variant="outline">
                  <FaSistrix className="h-5 w-5" />
                </Button>
              </div>
            </ViewAddDialogButton>
          </>
        )}
        {!isPending && !isYourOwnBook && user && (
          <>
            <ViewAddDialogButton bookId={book.id as string} asChild>
              <div className="flex items-center w-full gap-x-2">
                <Button size="lg" className="w-full" variant="outline">
                  <FaSistrix className="h-5 w-5" />
                </Button>
              </div>
            </ViewAddDialogButton>
            <AddToCartButton bookId={book.id} />
          </>
        )}
        {!isPending && isYourOwnBook && user && (
          <Button
            variant="green"
            className="w-full"
            size="lg"
            onClick={() => {
              router.push(`/services/read/${book.id}`);
            }}
          >
            <div className="flex items-center justify-center gap-x-2">
              Read
              <FaReadme className="h-5 w-5" />
            </div>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCardItem;
