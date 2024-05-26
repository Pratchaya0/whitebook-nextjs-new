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
import { WebInformationSchema } from "@/schemas";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { updatePayment } from "@/actions/payment";
import { WebInformation } from "@prisma/client";
import { getWebInformation } from "@/data/webinfo";
import { updateWebInfo } from "@/actions/webinfo";
import { FaRedoAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface UpdateWebInfoFormProps {
  webinfo: WebInformation;
  fetchData: () => void;
}

const UpdateWebInfoForm = ({ webinfo, fetchData }: UpdateWebInfoFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof WebInformationSchema>>({
    resolver: zodResolver(WebInformationSchema),
    defaultValues: {
      name: webinfo?.name as string,
      email: webinfo?.email as string,
      phone: webinfo?.phone as string,
      facebook: webinfo?.facebook as string,
      line: webinfo?.line as string,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof WebInformationSchema>) {
    // clear message
    setError("");
    setSuccess("");

    toast.promise(
      new Promise((resolve) => {
        updateWebInfo(values)
          .then((res) => {
            if (res?.error) {
              setError(res?.error);
            }

            if (res?.success) {
              router.refresh();
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
          // fetchData();
          return `Process has done!`;
        },
        error: "Oops! what's wrong?",
      }
    );
  }

  return (
    <Card className="w-full">
      <CardContent>
        {!isPending && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="New name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="New email..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="New phone..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="New facebook..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="line"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="New line..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <div className="flex justify-end items-end gap-x-2">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdateWebInfoForm;
