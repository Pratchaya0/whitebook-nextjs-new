import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";
import CardWrapper from "@/components/home/card-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdvertiseCarousel from "@/components/home/advertise-carousel";
import BookCard from "@/components/home/book-card";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-slate-500">
      <CardWrapper headerLabel="E-Book marketplace" showFooter>
        <ScrollArea className="w-full p-auto m-0 h-[79vh]">
          <AdvertiseCarousel />
          <BookCard />
        </ScrollArea>
      </CardWrapper>
    </main>
  );
}
