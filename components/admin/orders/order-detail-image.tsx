"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getBookImagesByBookId } from "@/data/book-image";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";
import PacmanLoader from "react-spinners/PacmanLoader";

interface OrderDetailImageProps {
  bookId: string;
}

const OrderDetailImage = ({ bookId }: OrderDetailImageProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchImages = async () => {
    const data = await getBookImagesByBookId(bookId);
    data?.map((_, index) => {
      const imageRef = ref(storage, _.imageUrl as string);
      getDownloadURL(imageRef)
        .then((url) => {
          setImages((prev) => [...prev, url as string]);
        })
        .catch((error) => {
          toast.error("Oops! something wrong");
        });
    });
  };

  useEffect(() => {
    startTransition(() => {
      fetchImages();
    });
  }, []);

  return (
    <Carousel className="w-[100px] m-3 mb-0">
      <CarouselContent>
        {images.map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="aspect-ratio">
                    <Image
                      src={_}
                      width={300}
                      height={350}
                      alt="Banner Image"
                      className="object-contain"
                      priority
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px" // Add this prop with appropriate values
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
    <CarouselNext /> */}
    </Carousel>
  );
};

export default OrderDetailImage;
