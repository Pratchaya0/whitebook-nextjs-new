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
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdvertisementSchema } from "@/schemas";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { addAdvertise, updateAdvertise } from "@/actions/advertise";
import { Advertisement } from "@prisma/client";

interface UpdateAdvertiseFormProps {
  advertise: Advertisement;
}

const UpdateAdvertiseForm = ({ advertise }: UpdateAdvertiseFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof AdvertisementSchema>>({
    resolver: zodResolver(AdvertisementSchema),
    defaultValues: {
      title: advertise.title as string,
      description: advertise.description as string,
      highlightDescription: advertise.highlightDescription as string,
      advertiseImageUrl: advertise.advertiseImageUrl as string,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AdvertisementSchema>) {
    // clear message
    setError("");
    setSuccess("");

    toast.promise(
      new Promise((resolve) => {
        startTransition(() => {
          updateAdvertise(values, advertise.id)
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
        <CardTitle>Update advertisement</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="New title..." {...field} />
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
                    <Input placeholder="New description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="highlightDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highlight Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New highlight description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="advertiseImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="New image..." {...field} />
                  </FormControl>
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

export default UpdateAdvertiseForm;
