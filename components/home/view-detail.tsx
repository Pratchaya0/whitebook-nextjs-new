"use client";

import { getBookByBookId } from "@/data/book";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "@/components/auth/back-button";
import { useEffect, useState, useTransition } from "react";
import {
  Book,
  BookPreviewImage,
  Category,
  GenreTag,
  Review,
} from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBookImagesByBookId } from "@/data/book-image";
import { getReviewsByBookId } from "@/data/review";
import { getGenreTagBuyBookId } from "@/data/genre-tag";
import Image from "next/image";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getCategoryById } from "@/data/category";
import { Badge } from "../ui/badge";
import PacmanLoader from "react-spinners/PacmanLoader";

interface ViewDetailProps {
  bookId: string;
  isPage?: boolean;
}

const ViewDetail = ({ bookId, isPage }: ViewDetailProps) => {
  const [book, setBook] = useState<Book>();
  const [category, setCategory] = useState<Category>();
  const [images, setImages] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [genreTags, setGenreTags] = useState<GenreTag[]>([]);
  const [isPending, startTransition] = useTransition();
  const fetchBook = async () => {
    const data = await getBookByBookId(bookId);
    setBook(data as Book);
    fetchCategory(data as Book);
  };
  const fetchImages = async () => {
    const data = await getBookImagesByBookId(bookId);
    data?.map((_, index) => {
      const imageRef = ref(storage, _.imageUrl as string);
      getDownloadURL(imageRef)
        .then((url) => {
          // console.log(url);
          setImages((prev) => [...prev, url as string]);
        })
        .catch((error) => {
          toast.error("Oops! something wrong");
        });
    });
  };
  const fetchReviews = async () => {
    const data = await getReviewsByBookId(bookId);
    setReviews(data as Review[]);
  };
  const fetchGenreTags = async () => {
    const data = await getGenreTagBuyBookId(bookId);
    setGenreTags(data as GenreTag[]);
  };
  const fetchCategory = async (book: Book) => {
    const data = await getCategoryById(book.categoryId as string);
    setCategory(data as Category);
  };

  useEffect(() => {
    startTransition(() => {
      fetchBook();
      fetchImages();
      fetchGenreTags();
      if (!isPage) {
        fetchReviews();
      }
    });
  }, []);

  console.log(book);
  console.log(images);
  console.log(reviews);
  console.log(genreTags);

  return (
    <Card className={"w-[450px] shadow-md"}>
      <CardHeader className="pb-1">Book Details</CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[600px] w-full">
          {isPending && (
            <div className="h-[600px] w-full flex justify-center items-center">
              <PacmanLoader color="#36d7b7" />
            </div>
          )}
          {!isPending && (
            <>
              {/* Images */}
              <Carousel className="w-[425px] m-3 mb-0">
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
              {/* Detail */}
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">Book Name</TableCell>
                    <TableCell>{book?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Description</TableCell>
                    <TableCell>{book?.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Price</TableCell>
                    <TableCell>{book?.price} ฿</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Publisher</TableCell>
                    <TableCell>{book?.publisher}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Writer</TableCell>
                    <TableCell>{book?.writer}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Category</TableCell>
                    <TableCell>{category?.categoryName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Genre</TableCell>
                    <TableCell className="flex gap-x-2">
                      {genreTags.map((_, index) => (
                        <Badge key={index}>{_.genreTagName}</Badge>
                      ))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
        </ScrollArea>
      </CardContent>

      {!isPage && (
        <CardFooter className="pt-1">
          <BackButton label={"more detail"} href={`services/book-detail/${book?.id}`} />
        </CardFooter>
      )}
    </Card>
  );
};

export default ViewDetail;
