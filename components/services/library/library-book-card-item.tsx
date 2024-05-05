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
import { FaBars, FaReadme, FaSistrix } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface LibraryBookCardItemProps {
  book: Book;
}

const LibraryBookCardItem = ({ book }: LibraryBookCardItemProps) => {
  const router = useRouter();

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
        <div className="flex items-center justify-between gap-x-2">
          <div>
            <Button
              variant="green"
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
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="lg">
                  <FaBars className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(book.id)}
                >
                  Copy book ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View book detail</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LibraryBookCardItem;
