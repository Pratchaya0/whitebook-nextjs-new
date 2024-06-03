"use client";
import { getReviewsByBookId } from "@/data/review";
import ReviewContent from "./review-content";
import ReviewForm from "./review-form";
import { useEffect, useState, useTransition } from "react";
import { Review } from "@prisma/client";
import PacmanLoader from "react-spinners/PacmanLoader";

interface ReviewClientProps {
  bookId: string;
}

const ReviewClient = ({ bookId }: ReviewClientProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isPending, startTransition] = useTransition();
  const fetchReviews = async () => {
    startTransition(async () => {
      const data = await getReviewsByBookId(bookId);
      setReviews(data as Review[]);
    });
  };

  useEffect(() => {
    // startTransition(() => {
    fetchReviews();
    // });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-3">
      <div>
        <ReviewForm bookId={bookId} fetchData={fetchReviews} />
      </div>
      <div className="col-span-2">
        {isPending ? (
          <div className="w-full flex justify-center items-center">
            <PacmanLoader color="#36d7b7" />
          </div>
        ) : (
          <ReviewContent
            bookId={bookId}
            fetchData={fetchReviews}
            reviews={reviews}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewClient;
