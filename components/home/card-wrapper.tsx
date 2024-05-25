"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/components/home/header";
import BackButton from "@/components/auth/back-button";
import Footer from "@/components/home/footer";
import { useEffect, useState, useTransition } from "react";
import { getWebInformation } from "@/data/webinfo";
import { WebInformation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  showFooter?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  showFooter,
}: CardWrapperProps) => {
  const [data, setData] = useState<WebInformation>();
  const fetchWebInfo = async () => {
    const data = await getWebInformation();
    setData(data as WebInformation);
    const session = await getSession();
    console.log(session);
  };
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      fetchWebInfo();
    });
  }, []);

  return (
    <Card className="w-[100vw] h-[100vh] shadow-md">
      <CardHeader className="pb-1 shadow-md">
        <Header label={headerLabel} webName={data?.name as string} />
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
      {showFooter && (
        <CardFooter className="pt-1 shadow-md">
          <div className="w-full flex items-center justify-center mt-4">
            {isPending && "Loading"}
            {!isPending && <Footer data={data as WebInformation} />}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
