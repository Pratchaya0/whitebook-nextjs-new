"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/schemas";
import * as z from "zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState, useTransition } from "react";
import { addNewCategory } from "@/actions/category";
import { toast } from "sonner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

const AddCategoryForm = () => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      categoryName: "",
      categoryIcon: "",
      userId: user?.id as string,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CategorySchema>) {
    // clear message
    setError("");
    setSuccess("");

    toast.promise(
      new Promise((resolve) => {
        addNewCategory(values)
          .then((res) => {
            if (res?.error) {
              form.reset();
              setError(res?.error);
            }

            if (res?.success) {
              form?.reset();
              setSuccess(res?.success);
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
        <CardTitle>Create category</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="New category name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create By</FormLabel>
                  <FormControl>
                    <Input placeholder="User id" {...field} readOnly />
                  </FormControl>
                  <FormDescription>
                    This is your user id (auto field).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddCategoryForm;
