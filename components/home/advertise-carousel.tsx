import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const AdvertiseCarousel = () => {
  return (
    <Carousel className="w-full mb-8">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="aspect-ratio p-0">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-0 p-0">
                    <div className="mx-auto mt-0 px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                      <div className="mb-8 md:mb-0 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                          Best Sale
                        </h1>
                        <p className="text-lg md:text-xl text-white mb-2">
                          Enjoy discounts on selected items
                        </p>
                        <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
                          GET 50% OFF
                        </p>
                      </div>
                      <div className="w-1/3 relative aspect-video">
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/whitebook-411409.appspot.com/o/products%2F1705912339334-10002.jpg?alt=media&token=bb73ebcc-bbec-4532-827c-81213b01f0f3"
                          fill
                          alt="Banner Image"
                          className="object-contain"
                          priority
                          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px" // Add this prop with appropriate values
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default AdvertiseCarousel;
