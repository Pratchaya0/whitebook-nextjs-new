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
import { Book, Order, User } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import OrderDetailImage from "./order-detail-image";
import { getOrderById } from "@/data/order";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "@/data/user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import ViewImageDialogButton from "../view-image-dialog-button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface OrderDetailProps {
  orderId: string;
}

const OrderDetail = ({ orderId }: OrderDetailProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [order, setOrder] = useState<Order>();
  const [user, setUser] = useState<User>();
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
  const fetchOrder = async () => {
    const data = await getOrderById(orderId);
    setOrder(data as Order);
    fetchUser(data?.userId as string);
  };
  const fetchUser = async (userId: string) => {
    const data = await getUserById(userId);
    setUser(data as User);
  };

  useEffect(() => {
    startTransition(() => {
      fetchBooks();
      fetchOrder();
      fetchSumOfAllBooks();
    });
  }, []);

  const FormateDate = (date: Date) => {
    const formattedDate = date
      ? format(new Date(date), "dd-MM-yyyy HH:mm:ss")
      : "";
    return formattedDate;
  };

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-bold">Order Id</TableCell>
            <TableCell>{order?.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Amount</TableCell>
            <TableCell>{order?.amount} ฿</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Status</TableCell>
            <TableCell>
              <Badge>{order?.isPaid ? "Paid" : "Pending"}</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Slip</TableCell>
            <TableCell>
              <Card className="w-[200px]">
                <CardContent className="flex aspect-square items-center justify-center p-0 m-0">
                  <ViewImageDialogButton url={order?.paymentImageUrl as string}>
                    <div className="aspect-ratio">
                      <Image
                        src={order?.paymentImageUrl as string}
                        width={150}
                        height={350}
                        alt="Banner Image"
                        className="object-contain"
                        priority
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px" // Add this prop with appropriate values
                      />
                    </div>
                  </ViewImageDialogButton>{" "}
                </CardContent>
              </Card>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">User</TableCell>
            <TableCell>
              <div className="flex justify-start items-start gap-x-3">
                <Avatar>
                  <AvatarImage
                    className="object-contain"
                    src={
                      user?.image === null
                        ? "https://github.com/shadcn.png"
                        : user?.image
                    }
                  />
                </Avatar>
                <div className="py-3">{user?.name}</div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Create date</TableCell>
            <TableCell>{FormateDate(order?.createdDate as Date)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <hr className="m-5" />
      <Table>
        <TableCaption>
          If something wrong. Please contract to customer service.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Cover Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((_, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <div className="aspect-ratio">
                    <Image
                      src={_.coverImageUrl as string}
                      width={150}
                      height={350}
                      alt="Banner Image"
                      className="object-contain"
                      priority
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px" // Add this prop with appropriate values
                    />
                  </div>
                  {/* <OrderDetailImage bookId={_.id} /> */}
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
    </div>
  );
};

export default OrderDetail;
