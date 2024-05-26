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
import { GenreTagSchema } from "@/schemas";
import * as z from "zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { addNewGenreTag, updateGenreTag } from "@/actions/genreTag";
import { GenreTag } from "@prisma/client";

interface UpdateGenreTagFormProps {
  genreTag: GenreTag;
}

const UpdateGenreTagForm = ({ genreTag }: UpdateGenreTagFormProps) => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof GenreTagSchema>>({
    resolver: zodResolver(GenreTagSchema),
    defaultValues: {
      genreTagName: genreTag.genreTagName as string,
      userId: user?.id as string,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof GenreTagSchema>) {
    // clear message
    setError("");
    setSuccess("");

    toast.promise(
      new Promise((resolve) => {
        startTransition(() => {
          updateGenreTag(values, genreTag.id)
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
        <CardTitle>Update genre tag</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="genreTagName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="New genre tag name..." {...field} />
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
              {isPending ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateGenreTagForm;
