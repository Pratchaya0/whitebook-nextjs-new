"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema } from "@/schemas";
import * as z from "zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState, useTransition } from "react";
import { addNewCategory } from "@/actions/category";
import { toast } from "sonner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Book } from "@prisma/client";
import { FaPaperclip } from "react-icons/fa";
import { getSumOfAllBookInCartByCartId } from "@/data/book";
import { useCurrentCart } from "@/hooks/use-current-cart";
import { getDownloadURL, list, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 } from "uuid";
import { createOrder } from "@/actions/order";

interface CartCheckoutFormProps {
  books: Book[];
}

const CartCheckoutForm = () => {
  const user = useCurrentUser();
  const cartId = useCurrentCart();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [sumOfAllBooks, setSumOfAllBooks] = useState<number>();
  const fetchSumOfAllBooks = async () => {
    const data = await getSumOfAllBookInCartByCartId(cartId as string);
    setSumOfAllBooks(data as number);
  };

  useEffect(() => {
    startTransition(() => {
      fetchSumOfAllBooks();
    });
  }, []);

  const [imageLocal, setImageLocal] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const uploadSlip = () => {
    console.log("upload slip");
    if (imageLocal == null) return;

    const imageRef = ref(storage, `payments/${v4()}`);
    uploadBytes(imageRef, imageLocal).then((url) => {
      const refFIle = ref(storage, url.metadata.fullPath);
      getDownloadURL(refFIle)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          setError("Image something wrong");
        });
    });
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      amount: 1000,
      paymentImageUrl: "",
      userId: user?.id as string,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof OrderSchema>) {
    setError("");
    setSuccess("");

    uploadSlip();

    values.paymentImageUrl = imageUrl as string;
    console.log(values);

    toast.promise(
      new Promise((resolve, reject) => {
        createOrder(values, cartId as string)
          .then((res) => {
            if (res?.error) {
              form.reset();
              setError(res?.error);
              reject();
            }
            if (res?.success) {
              form?.reset();
              setSuccess(res?.success);
              resolve({ res: res?.success });
            }
          })
          .catch(() => {
            setError("Something went wrong!");
            reject();
          });
      }),
      {
        loading: "Loading...",
        success: (data) => {
          return `Process has done!`;
        },
        error: "Oops! what's wrong?",
      }
    );
  }

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New category name..."
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormDescription>
                    This is your user id (auto field).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order By</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New user id name..."
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormDescription>
                    This is your user id (auto field).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-start items-center gap-x-2">
                      <FaPaperclip />
                      <div>Slip</div>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="User id"
                      {...field}
                      type="file"
                      onChange={(event) => {
                        const file =
                          event.target.files && event.target.files[0];
                        if (file) {
                          setImageLocal(file);
                          console.log(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Ok"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CartCheckoutForm;
