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
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { addNewGenreTag } from "@/actions/genreTag";
import { addReviews, updateReview } from "@/actions/review";
import AddToCartButton from "@/components/home/add-to-cart-button";
import {
  checkIfBookInBuyerBookByBookId,
  checkIfIsAvailableByBookId,
} from "@/data/bayer-book";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { checkReviewByUserIdAndBookId } from "@/data/review";
import { useRouter } from "next/navigation";
import { FaReadme } from "react-icons/fa";
import { Review } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

interface ReviewUpdateFormProps {
  review: Review;
  fetchReviewData: () => void;
}

const ReviewUpdateForm = ({
  review,
  fetchReviewData,
}: ReviewUpdateFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      comment: review.comment as string,
      rating: "",
      bookId: review.bookId as string,
      userId: review.userId as string,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ReviewSchema>) {
    // clear message
    setError("");
    setSuccess("");

    toast.promise(
      new Promise((resolve) => {
        startTransition(() => {
          updateReview(values, review.id)
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
          fetchReviewData();
          return `Process has done!`;
        },
        error: "Oops! what's wrong?",
      }
    );
  }

  return (
    <>
      {!isPending && (
        <Card className="w-[450px]">
          <CardContent className="mt-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          maxLength={500}
                          className="h-[250px]"
                          placeholder="Comment"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Update..." : "Update"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ReviewUpdateForm;
