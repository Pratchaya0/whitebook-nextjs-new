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
import { ReviewSchema } from "@/schemas";
import * as z from "zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { addNewGenreTag } from "@/actions/genreTag";
import { addReviews } from "@/actions/review";
import AddToCartButton from "@/components/home/add-to-cart-button";

interface ReviewFormProps {
  bookId: string;
}

const ReviewForm = ({ bookId }: ReviewFormProps) => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      comment: "",
      rating: "",
      bookId: bookId as string,
      userId: user?.id as string,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ReviewSchema>) {
    console.log(values);
    // clear message
    setError("");
    setSuccess("");

    toast.promise(
      new Promise((resolve) => {
        startTransition(() => {
          addReviews(values)
            .then((res) => {
              if (res?.error) {
                form.reset();
                setError(res?.error);
              }

              if (res?.success) {
                form?.reset();
                setSuccess(res?.success);
              }
            })
            .catch(() => {
              setError("Something went wrong!");
            });
        });
        resolve({ res: "Temp" });
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
    <>
      <Card className="w-full">
        <CardContent className="mt-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Input placeholder="Comment" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your user id (auto field).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-2">
        <AddToCartButton bookId={bookId as string} text="Add to cart" />
      </div>
    </>
  );
};

export default ReviewForm;
