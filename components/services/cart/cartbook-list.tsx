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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CartBookList = () => {
  const cartId = useCurrentCart();
  const { decrease } = useCountCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [sumOfAllBooks, setSumOfAllBooks] = useState<number>();
  const [isPending, startTransition] = useTransition();
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const sumAllSelectedBook = async () => {
    const data = books
      .filter((item) => selectedBooks.includes(item.id))
      .map((item) => item.price);

    let amount = 0;
    data.forEach((_) => {
      amount += parseFloat(_!);
    });
    setSumOfAllBooks(amount as number);
  };

  const removeSelectedBooks = (status: boolean, bookId: string) => {
    // Check if the item exists in the array
    if (selectedBooks.includes(bookId) && status === false) {
      // Filter out the item from the array
      const updatedItems = selectedBooks.filter((item) => item !== bookId);
      // Update the state with the new array
      setSelectedBooks(updatedItems);
    }
  };

  const addSelectedBooks = (status: boolean, bookId: string) => {
    if (!selectedBooks.includes(bookId) && status === true) {
      setSelectedBooks((prev) => [...prev, bookId]);
    }
  };

  const fetchBooks = async () => {
    const data = await getListBooksInCartByCartId(cartId as string);
    setBooks(data as Book[]);
  };

  const refreshDetail = async (bookId: string) => {
    fetchBooks();
    removeSelectedBooks(false, bookId);
    sumAllSelectedBook();
  };

  useEffect(() => {
    startTransition(() => {
      fetchBooks();
      sumAllSelectedBook();
    });
  }, []);

  useEffect(() => {
    startTransition(() => {
      sumAllSelectedBook();
    });
  }, [selectedBooks]);

  return (
    <>
      <Table>
        {/* <TableCaption>A list of your book in cart</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                onCheckedChange={(_) => {
                  if (_) {
                    const selectAllItems = books.map((book) => book.id);
                    setSelectedBooks(selectAllItems);
                  } else {
                    setSelectedBooks([]);
                  }
                }}
              />
            </TableHead>
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
                <Checkbox
                  checked={selectedBooks.includes(book.id)}
                  onCheckedChange={(_) => {
                    console.log(_);
                    switch (_) {
                      case true:
                        addSelectedBooks(_ as boolean, book.id);
                        break;

                      default:
                        removeSelectedBooks(_ as boolean, book.id);
                        break;
                    }
                  }}
                />
              </TableCell>
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
                              refreshDetail(book.id);
                              // fetchBooks();
                              // removeSelectedBooks(false, book.id);
                              // sumAllSelectedBook();
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
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{sumOfAllBooks} ฿</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end items-center mt-3 gap-x-2">
        {/* <Button
          variant="secondary"
          className="ml-auto"
          disabled={isPending}
          onClick={() => {
            startTransition(() => {
              fetchBooks();
              sumAllSelectedBook();
            });
          }}
        >
          <FaRedoAlt />
        </Button> */}
        {isPending || sumOfAllBooks === 0 ? (
          <div className="w-[330px]">
            <Alert variant="green">
              <AlertDescription>
                Please select some item before check out :)
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <CartCheckoutButton>
            <CartCheckoutForm
              amount={sumOfAllBooks as number}
              bookIds={selectedBooks}
              refreshDetail={refreshDetail}
            />
          </CartCheckoutButton>
        )}
      </div>
    </>
  );
};

export default CartBookList;
