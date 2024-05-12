import { Avatar } from "@/components/ui/avatar";
import { getUserById } from "@/data/user";
import { User } from "@prisma/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";

interface ReviewUserProps {
  userId: string;
}

const ReviewUser = ({ userId }: ReviewUserProps) => {
  const [user, setUser] = useState<User>();
  const fetchUser = async () => {
    const data = await getUserById(userId);
    setUser(data as User);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex justify-start items-start gap-x-3">
      <Avatar>
        <AvatarImage
          src={
            user?.image === null ? "https://github.com/shadcn.png" : user?.image
          }
        />
      </Avatar>
      <div className="py-3">{user?.name}</div>
    </div>
  );
};

export default ReviewUser;
