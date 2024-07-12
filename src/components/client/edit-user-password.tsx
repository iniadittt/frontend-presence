"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserPasswordSchema } from "@/lib/schema/edit-user";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUserPassword } from "@/lib/services/user";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function FormEditUserPassword({ user }: { user: any }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof editUserPasswordSchema>>({
    resolver: zodResolver(editUserPasswordSchema),
    defaultValues: {
      password: "",
      konfirmasiPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof editUserPasswordSchema>) {
    setIsLoading(true);
    try {
      const response = await updateUserPassword(
        session!.user.token,
        user.id,
        values
      );
      if (response.code !== 200) {
        setIsLoading(false);
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      router.push(`/admin/users`);
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      console.error("An error occurred", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex justify-end gap-2">
          <Link href={`/admin/users/${user.id}`}>
            <Button variant={"outline"}>Cancel</Button>
          </Link>
          <Button
            className="bg-green-600 hover:bg-green-500"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Simpan"}
          </Button>
        </div>
        <div className="grid grid-cols-2 w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input id="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={form.control}
              name="konfirmasiPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="konfirmasiPassword">
                    Konfirmasi Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="konfirmasiPassword"
                      placeholder="Konfirmasi password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
