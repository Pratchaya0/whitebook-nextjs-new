"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/components/home/header";
import BackButton from "@/components/auth/back-button";

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
  return (
    <Card className="w-[100vw] h-[100vh] shadow-md">
      <CardHeader className="pb-1">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
      {showFooter && (
        <CardFooter className="pt-1">
          <BackButton label={"temp"} href={"temp"} />
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
