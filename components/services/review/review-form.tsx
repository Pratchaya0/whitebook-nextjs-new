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
import { addReviews } from "@/actions/review";
import AddToCartButton from "@/components/home/add-to-cart-button";
import {
  checkIfBookInBuyerBookByBookId,
  checkIfIsAvailableByBookId,
} from "@/data/bayer-book";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { checkReviewByUserIdAndBookId } from "@/data/review";
import { useRouter } from "next/navigation";
import { FaReadme } from "react-icons/fa";

interface ReviewFormProps {
  bookId: string;
}

const ReviewForm = ({ bookId }: ReviewFormProps) => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isBookBought, setIsBookBought] = useState<boolean>(false);
  const [isReviewed, setIsReviewed] = useState<boolean>(true);
  const [isYourOwnBook, setIsYourOwnBook] = useState<boolean>(false);
  const router = useRouter();
  const checkIsYourOwnBook = async () => {
    const data = await checkIfIsAvailableByBookId(bookId, user?.id as string);
    setIsYourOwnBook(data);
  };
  const checkBook = async () => {
    const data = await checkIfBookInBuyerBookByBookId(
      bookId as string,
      user?.id as string
    );
    setIsBookBought(data);
  };
  const checkReviewed = async () => {
    const data = await checkReviewByUserIdAndBookId(
      user?.id as string,
      bookId as string
    );
    setIsReviewed(data);
  };

  useEffect(() => {
    startTransition(() => {
      checkBook();
      checkReviewed();
      checkIsYourOwnBook();
    });
  }, []);

  console.log(isBookBought);
  console.log(isYourOwnBook);
  console.log(isReviewed);

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
      {!isBookBought && !isYourOwnBook && (
        <Alert variant="amber">
          {/* <AlertCircle className="h-4 w-4" /> */}
          <AlertTitle>Comment</AlertTitle>
          <AlertDescription>
            You can add a comment after buy this book. :)
          </AlertDescription>
        </Alert>
      )}
      {isBookBought && !isYourOwnBook && (
        <Alert variant="amber">
          {/* <AlertCircle className="h-4 w-4" /> */}
          <AlertTitle>Comment</AlertTitle>
          <AlertDescription>
            You can add a comment after buy this book. :)
          </AlertDescription>
        </Alert>
      )}
      {isBookBought && isReviewed && isYourOwnBook && (
        <Alert variant="green">
          {/* <AlertCircle className="h-4 w-4" /> */}
          <AlertTitle>Comment</AlertTitle>
          <AlertDescription>You already add a review. :)</AlertDescription>
        </Alert>
      )}
      {isBookBought && !isReviewed && isYourOwnBook && (
        <Card className="w-full">
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
      )}

      <div className="mt-2">
        {!isPending && isYourOwnBook && (
          <Button
            variant="green"
            className="w-full"
            size="lg"
            onClick={() => {
              router.push(`/services/read/${bookId}`);
            }}
          >
            <div className="flex items-center justify-center gap-x-2">
              Read
              <FaReadme className="h-5 w-5" />
            </div>
          </Button>
        )}
        {!isYourOwnBook && (
          <AddToCartButton bookId={bookId as string} text="Add to cart" />
        )}
      </div>
    </>
  );
};

export default ReviewForm;
