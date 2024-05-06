"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getListAdvertise } from "@/data/advertise";
import { Advertisement } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

const AdvertiseCarousel = () => {
  const [data, setData] = useState<Advertisement[]>([]);
  const [isPending, startTransition] = useTransition();
  const advertises = async () => {
    const data = await getListAdvertise();
    setData(data as Advertisement[]);
  };

  useEffect(() => {
    startTransition(() => {
      advertises();
    });
  }, []);

  return (
    <Carousel className="w-full mb-8">
      <CarouselContent>
        {!isPending &&
          data.map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="aspect-ratio p-0">
                    {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-0 p-0">
                      <div className="mx-auto mt-0 px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                        <div className="mb-8 md:mb-0 text-center">
                          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {_.title}
                          </h1>
                          <p className="text-lg md:text-xl text-white mb-2">
                            {_.description}
                          </p>
                          <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
                            {_.highlightDescription}
                          </p>
                        </div>
                        <div className="w-1/3 relative aspect-video">
                          <Image
                            src={_.advertiseImageUrl as string}
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
