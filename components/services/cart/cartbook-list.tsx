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
  getListBooksInCartByCartId,
  getSumOfAllBookInCartByCartId,
} from "@/data/book";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { Book, CartBook } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { FaRedoAlt, FaTrashAlt } from "react-icons/fa";
import CartCheckoutButton from "@/components/services/cart/cart-checkout-button";
import { deleteBookFromCartByCartIdAndBookId } from "@/actions/cart";
import { toast } from "sonner";
import CartCheckoutForm from "@/components/services/cart/cart-checkout-form";
import { useCountCart } from "@/hooks/use-cart-count";

const CartBookList = () => {
  const cartId = useCurrentCart();
  const { decrease } = useCountCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [sumOfAllBooks, setSumOfAllBooks] = useState<number>();
  const [isPending, startTransition] = useTransition();

  const fetchBooks = async () => {
    const data = await getListBooksInCartByCartId(cartId as string);
    setBooks(data as Book[]);
  };
  const fetchSumOfAllBooks = async () => {
    const data = await getSumOfAllBookInCartByCartId(cartId as string);
    setSumOfAllBooks(data as number);
  };

  useEffect(() => {
    startTransition(() => {
      fetchBooks();
      fetchSumOfAllBooks();
    });
  }, []);

  return (
    <>
      <Table>
        {/* <TableCaption>A list of your book in cart</TableCaption> */}
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[100px]">Id</TableHead> */}
            <TableHead className="w-[100px]">Cover Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[50px]"></TableHead>
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
              <TableCell>{book.description}</TableCell>
              <TableCell className="text-right">{book.price}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  disabled={isPending}
                  onClick={() => {
                    toast.promise(
                      new Promise((resolve) => {
                        resolve(
                          deleteBookFromCartByCartIdAndBookId(
                            cartId as string,
                            book.id
                          )
                        );
                      }),
                      {
                        loading: "Loading...",
                        success: (data: any) => {
                          switch (data.code) {
                            case 1:
                              break;

                            default:
                              decrease();
                              break;
                          }
                          return `${data.res as string}`;
                        },
                        error: "Oops! what's wrong?",
                      }
                    );
                  }}
                >
                  <FaTrashAlt className="h-3 w-3 p-0 m-0 text-red-500 font-bold" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{sumOfAllBooks} ฿</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end items-center mt-3 gap-x-2">
        <Button
          variant="secondary"
          className="ml-auto"
          disabled={isPending}
          onClick={() => {
            startTransition(() => {
              fetchBooks();
              fetchSumOfAllBooks();
            });
          }}
        >
          <FaRedoAlt />
        </Button>
        {isPending || sumOfAllBooks === 0 ? (
          <div></div>
        ) : (
          <CartCheckoutButton>
            <CartCheckoutForm amount={sumOfAllBooks as number} />
          </CartCheckoutButton>
        )}
      </div>
    </>
  );
};

export default CartBookList;
