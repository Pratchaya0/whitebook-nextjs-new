"use client";

import {
  addBookPreviewImage,
  addBookPreviewImage_v2,
} from "@/actions/book-preview-image";
import { addGenreTagBookByGenreTagId } from "@/actions/genreTag-book";
import { addProduct } from "@/actions/product";
import { uploadBookFile } from "@/actions/upload-book";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getListCategories } from "@/data/category";
import { getListGenreTag } from "@/data/genre-tag";
import { useEdgeStore } from "@/lib/edgestore";
import { storage } from "@/lib/firebase";
import { BookSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, GenreTag, GenreTagBook } from "@prisma/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 } from "uuid";
import * as z from "zod";

const AddProductForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [genreTag, setGenreTags] = useState<GenreTag[]>([]);
  const [coverImageLocal, setCoverImageLocal] = useState<File | null>();
  const [previewImage, setPreviewImage] = useState<File[] | null>([]);
  const [tmpPreviewImageUrl, setTmpPreviewImageUrl] = useState<string[] | null>(
    []
  );
  const [bookFile, setBookFile] = useState<File | null>();
  const [bookGenreTag, setBookGenreTag] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { edgestore } = useEdgeStore();

  const fetchGenreTags = async () => {
    const data = await getListGenreTag();
    setGenreTags(data as GenreTag[]);
  };
  const fetchCategories = async () => {
    const data = await getListCategories();
    setCategories(data as Category[]);
  };

  useEffect(() => {
    startTransition(() => {
      fetchGenreTags();
      fetchCategories();
    });
  }, []);

  const validateFliedWithoutZod = async (
    values: z.infer<typeof BookSchema>
  ) => {
    const errors: string[] = [];

    if (values.name === undefined && typeof values.name !== "string") {
      errors.push("Name is require.");
    }

    if (
      values.description === undefined &&
      typeof values.description !== "string"
    ) {
      errors.push("Description is require.");
    }

    if (values.price === undefined && typeof values.price !== "string") {
      errors.push("Price is require.");
    }

    if (values.writer === undefined && typeof values.writer !== "string") {
      errors.push("Writer is require.");
    }

    if (
      values.publisher === undefined &&
      typeof values.publisher !== "string"
    ) {
      errors.push("Publisher is require.");
    }

    if (values.isOnSale === undefined && typeof values.isOnSale !== "boolean") {
      errors.push("IsOnSale must be a boolean.");
    }

    if (
      values.categoryId === undefined &&
      typeof values.categoryId !== "string"
    ) {
      errors.push("Category ID is require.");
    }

    if (!bookFile) {
      errors.push("Book file is require.");
    }

    if (!bookGenreTag) {
      errors.push("Book tag is require.");
    }

    if (!previewImage) {
      errors.push("Book preview image is require.");
    }

    if (!coverImageLocal) {
      errors.push("Book cover image is require.");
    }

    if (error?.length !== 0) {
      const error = errors.join(", ");
      setError(error);
      return;
    }

    uploadCoverImage(values);
  };

  const uploadCoverImage = (values: z.infer<typeof BookSchema>) => {
    if (coverImageLocal == null) {
      uploadBook(values);
      // onSubmit(values);
      return;
    }

    const imageRef = ref(storage, `product-cover/${v4()}`);
    uploadBytes(imageRef, coverImageLocal).then((url) => {
      const refFIle = ref(storage, url.metadata.fullPath);
      getDownloadURL(refFIle)
        .then((url) => {
          values.coverImage = url;
          // onSubmit(values);
          uploadBook(values);
        })
        .catch((error) => {
          setError("Image something wrong");
        });
    });
  };

  const uploadPreviewImage = async (bookId: string) => {
    if (previewImage == null) {
      return;
    }

    // upload file to firebase
    previewImage.forEach((imageFile) => {
      const imageRef = ref(storage, `product-images/${v4()}`);
      uploadBytes(imageRef, imageFile).then((url) => {
        const refFIle = ref(storage, url.metadata.fullPath);
        getDownloadURL(refFIle)
          .then((url) => {
            setTmpPreviewImageUrl((prev) => [...(prev as string[]), url]);
            addPreviewImageToDatabase(url, bookId);
          })
          .catch((error) => {
            setError("Image something wrong");
          });
      });
    });
  };

  const addPreviewImageToDatabase = async (url: string, bookId: string) => {
    const res = await addBookPreviewImage_v2(url, bookId);
  };

  const uploadBook = async (values: z.infer<typeof BookSchema>) => {
    if (bookFile == null) {
      onSubmit(values);
      return;
    }

    const res = await edgestore.publicFiles.upload({
      file: bookFile,
      onProgressChange: (progress: any) => {
        // you can use this to show a progress bar
        console.log(progress);
      },
    });
    values.bookUrl = res.url;

    onSubmit(values);
  };

  const createGenreTagBook = async (bookId: string) => {
    if (bookGenreTag == null) {
      return;
    }

    addGenreTagBookByGenreTagId(bookGenreTag, bookId);
  };

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      writer: "",
      publisher: "",
      isOnSale: false,
      coverImage: "",
      bookUrl: "",
      categoryId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof BookSchema>) {
    // add product return product id
    toast.promise(
      new Promise((resolve) => {
        addProduct(values)
          .then((res) => {
            if (res) {
              // upload preview image
              uploadPreviewImage(res.id);
              // upload genre tag
              createGenreTagBook(res.id);

              setSuccess("Product Added");
            }
          })
          .catch(() => {
            setError("Something went wrong!");
          });
        resolve({ res: "Temp" });
      }),
      {
        loading: "Loading...",
        success: (data) => {
          return `Process has done!`;
        },
        error: "Oops! what's wrong?",
      }
    );
  }

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Create product</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full p-auto m-0 h-[79vh]">
          <div className="m-1 mr-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(uploadCoverImage)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter book name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter book description..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter book price..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="writer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Writer</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter writer name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="publisher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publisher</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter book publish name..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isOnSale"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-x-2 space-y-3 leading-none">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FormLabel>Is it on sale?</FormLabel>
                          <FormDescription>
                            check if you want to public it after created **you
                            can change this later**
                          </FormDescription>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories &&
                            categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.categoryName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-1.5">
                      <Select
                        onValueChange={(genre) => {
                          const exist = bookGenreTag.find(
                            (genreId) => genreId === genre
                          );

                          if (!exist) {
                            setBookGenreTag((prev) => [...prev, genre]);
                          }
                        }}
                      >
                        <SelectTrigger id="genreId">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {genreTag &&
                            genreTag.map((genre) => (
                              <SelectItem key={genre.id} value={genre.id}>
                                {genre.genreTagName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  {bookGenreTag && (
                    <div className="flex-wrap items-start justify-start gap-x-2">
                      {bookGenreTag.map((_, index) => {
                        const selectedGenre = genreTag.find(
                          (genre) => genre.id === _
                        );
                        return (
                          <Badge key={index} className="mr-2">
                            {selectedGenre?.genreTagName}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => setBookGenreTag([])}
                  >
                    Clear
                  </Button>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(event) => {
                        const file =
                          event.target.files && event.target.files[0];
                        if (file) {
                          setCoverImageLocal(file);
                        }
                      }}
                    />
                  </FormControl>
                  {coverImageLocal && (
                    <div>
                      <img
                        src={URL.createObjectURL(coverImageLocal)}
                        alt="Uploaded"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormLabel>Preview Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(event) => {
                        const file =
                          event.target.files && event.target.files[0];
                        if (file) {
                          setPreviewImage((prev) => [
                            ...(prev as File[]),
                            file,
                          ]);
                        }
                      }}
                    />
                  </FormControl>
                  {previewImage && (
                    <div className="flex items-start justify-start gap-x-2">
                      {previewImage.map((_, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(_)}
                          alt="Uploaded"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      ))}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => setPreviewImage([])}
                  >
                    Clear
                  </Button>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormLabel>Book File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(event) => {
                        const file =
                          event.target.files && event.target.files[0];
                        if (file) {
                          setBookFile(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button type="submit">Create</Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
