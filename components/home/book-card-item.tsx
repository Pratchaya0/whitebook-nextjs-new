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
import ViewDialogButton from "@/components/home/view-dialog-button";
import { Button } from "@/components/ui/button";
import { FaSistrix } from "react-icons/fa";

interface BookCardItemProps {
  book: Book;
}

const BookCardItem = ({ book }: BookCardItemProps) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>{book.name}</CardTitle>
        <CardDescription>{book.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center w-full gap-1">
          <div className="aspect-square overflow-hidden relative w-full">
            <Image
              fill
              className="w-full h-full object-contain"
              src={
                "https://firebasestorage.googleapis.com/v0/b/whitebook-411409.appspot.com/o/products%2F1705912339334-10002.jpg?alt=media&token=bb73ebcc-bbec-4532-827c-81213b01f0f3"
              }
              alt={book.name as string}
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px" // Add this prop with appropriate values
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <ViewDialogButton bookId={book.id as string} asChild>
          <div className="flex items-center w-full gap-x-2">
            <Button size="lg" className="w-full" variant="outline">
              <FaSistrix className="h-5 w-5" />
            </Button>
          </div>
        </ViewDialogButton>
        <AddToCartButton bookId={book.id} />
      </CardFooter>
    </Card>
  );
};

export default BookCardItem;
