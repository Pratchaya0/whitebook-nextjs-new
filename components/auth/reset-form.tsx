"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useState, useTransition } from "react";
import Link from "next/link";
import { resetPassword } from "@/actions/reset-password";

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    // clear message
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit((values) => {
            onSubmit(values);
          })}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="whitebook@whitebook.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          {!success && (
            <Button type="submit" disabled={isPending} className="w-full">
              Send reset email
            </Button>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
