import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getUserById } from "@/data/user";
import { Review, User } from "@prisma/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { title } from "process";
import { useEffect, useState, useTransition } from "react";
import { FaFileSignature, FaTrash } from "react-icons/fa";
import ReviewUpdateForm from "./review-update-form";
import { toast } from "sonner";
import { deleteReview } from "@/actions/review";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

interface ReviewUserProps {
  userId: string;
  review: Review;
  fetchReviewData: () => void;
}

const ReviewUser = ({ userId, review, fetchReviewData }: ReviewUserProps) => {
  const currentUser = useCurrentUser();
  const [user, setUser] = useState<User>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const fetchUser = async () => {
    const data = await getUserById(userId);
    setUser(data as User);
  };
  const deleteReviewHandler = async () => {
    toast.promise(
      new Promise((resolve) => {
        resolve(deleteReview(review.id));
      }),
      {
        loading: "Loading...",
        success: (data: any) => {
          fetchReviewData();
          return `${data.res as string}`;
        },
        error: "Oops! what's wrong?",
      }
    );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex justify-between mb-3">
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
      {currentUser?.id === userId && (
        <div className="flex justify-end items-end gap-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="h-8 p-x-2">
                <div className="flex items-center justify-center gap-x-2">
                  <FaFileSignature className="h-3 w-3" />
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
              <ReviewUpdateForm
                review={review}
                fetchReviewData={fetchReviewData}
              />
            </DialogContent>
          </Dialog>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 p-x-2"
            onClick={deleteReviewHandler}
          >
            <div className="flex items-center justify-center gap-x-2">
              <FaTrash className="h-3 w-3 text-rose-500" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewUser;
