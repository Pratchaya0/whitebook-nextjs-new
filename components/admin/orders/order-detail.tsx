"use client";

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
import { getListBooksByOrderId, getSumOfListBooksByOrderId } from "@/data/book";
import { getListCartBookByCartId } from "@/data/cart-book";
import { Book, Cart } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import OrderDetailImage from "./order-detail-image";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

interface OrderDetailProps {
  orderId: string;
}

const OrderDetail = ({ orderId }: OrderDetailProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState<number>();
  const [isPending, startTransition] = useTransition();
  const fetchBooks = async () => {
    const data = await getListBooksByOrderId(orderId);
    setBooks(data as Book[]);
  };
  const fetchSumOfAllBooks = async () => {
    const data = await getSumOfListBooksByOrderId(orderId);
    setTotal(data as number);
  };

  useEffect(() => {
    startTransition(() => {
      fetchBooks();
      fetchSumOfAllBooks();
    });
  }, []);

  console.log(books);

  return (
    <Table>
      <TableCaption>
        If something wrong. Please contract to customer service.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((_, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <OrderDetailImage bookId={_.id} />
              </TableCell>
              <TableCell>{_.name}</TableCell>
              <TableCell className="text-right">{_.price}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right font-bold">{total} ฿</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default OrderDetail;
