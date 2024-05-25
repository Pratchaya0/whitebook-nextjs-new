"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getBookByBookId,
  getListBooksInCartByCartId,
  getSumOfAllBookInCartByCartId,
} from "@/data/book";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { Book, CartBook } from "@prisma/client";
import { useEffect, useRef, useState, useTransition } from "react";
import { FaRedoAlt, FaTrashAlt } from "react-icons/fa";
import CartCheckoutButton from "@/components/services/cart/cart-checkout-button";
import { deleteBookFromCartByCartIdAndBookId } from "@/actions/cart";
import { toast } from "sonner";
import CartCheckoutForm from "@/components/services/cart/cart-checkout-form";
import { useCountCart } from "@/hooks/use-cart-count";

interface CheckOutListProps {
  bookIds: string[];
  amount: number;
}

const CheckOutList = ({ bookIds, amount }: CheckOutListProps) => {
  const cartId = useCurrentCart();
  const { decrease } = useCountCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [sumOfAllBooks, setSumOfAllBooks] = useState<number>();
  const [isPending, startTransition] = useTransition();
  const initialized = useRef(false);

  const fetchBooks = async () => {
    // const data = await getListBooksInCartByCartId(cartId as string);
    if (bookIds) {
      bookIds.forEach(async (_) => {
        const data = await getBookByBookId(_);
        const tmpBookId = books.map((_) => _.id);
        console.log(tmpBookId);
        if (data) {
          if (!tmpBookId.includes(data.id)) {
            setBooks((prev) => [...prev, data as Book]);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      startTransition(() => {
        fetchBooks();
      });
    }
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* <TableHead className="w-[100px]">Id</TableHead> */}
          <TableHead className="w-[100px]">Cover Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.id}>
            {/* <TableCell className="font-medium">{book.id}</TableCell> */}
            <TableCell>
              <div>
                <img
                  src={book.coverImageUrl as string}
                  alt="Uploaded"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
            </TableCell>
            <TableCell>{book.name}</TableCell>
            <TableCell className="text-right">{book.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">{amount} ฿</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CheckOutList;
