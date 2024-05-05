"use client";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
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
import { BookSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book, Category } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface UpdateProductFormProps {
  book: Book;
}

const UpdateProductForm = ({ book }: UpdateProductFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategories = async () => {
    const data = await getListCategories();
    setCategories(data as Category[]);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      writer: "",
      publisher: "",
      isOnSale: false,
      bookUrl: "",
      categoryId: "",
    },
  });

  function onSubmit(values: z.infer<typeof BookSchema>) {
    console.log(values);
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
                onSubmit={form.handleSubmit((values) => {
                  onSubmit(values);
                })}
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
                  name="bookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Url</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="shadcn" {...field} /> */}
                        <Input {...field} type="file" />
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
                      <FormControl>
                        {/* <Input placeholder="shadcn" {...field} /> */}
                        <div className="flex flex-col space-y-1.5">
                          <Select>
                            <SelectTrigger id="categoryId">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {categories &&
                                categories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.categoryName}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create</Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default UpdateProductForm;
