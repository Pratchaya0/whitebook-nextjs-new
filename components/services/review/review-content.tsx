"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getReviewsByBookId } from "@/data/review";
import { Review } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import ReviewUser from "./review-user";

interface ReviewContentProps {
  bookId: string;
  fetchData: () => void;
  reviews: Review[];
  isPending: boolean;
}

const ReviewContent = ({ bookId, fetchData, reviews }: ReviewContentProps) => {
  // const [reviews, setReviews] = useState<Review[]>([]);
  // const [isPending, startTransition] = useTransition();
  // const fetchReviews = async () => {
  //   const data = await getReviewsByBookId(bookId);
  //   setReviews(data as Review[]);
  // };

  console.log(reviews);

  return (
    <>
      {reviews ? (
        <ScrollArea className="h-[250px] w-full">
          <Table>
            <TableBody>
              {reviews.map((_, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="">
                      <div className="font-bold">
                        <ReviewUser
                          userId={_.userId as string}
                          review={_}
                          fetchReviewData={fetchData}
                        />
                      </div>
                      <p>{_.comment}</p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      ) : (
        <div className="flex justify-center items-center">
          <p>This book dose not have review yet.</p>
        </div>
      )}
    </>
  );
};

export default ReviewContent;
