"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "@/lib/schema/edit-user";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUser } from "@/lib/services/user";
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

export default function FormEditUser({ user }: { user: any }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      active: user.active ? "true" : "false",
    },
  });

  async function onSubmit(values: z.infer<typeof editUserSchema>) {
    setIsLoading(true);
    try {
      const response = await updateUser(session!.user.token, user.id, values);
      if (response.code !== 200) {
        setIsLoading(false);
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      router.push(`/admin/users/${user.id}`);
      router.refresh()
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Alamat Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="email@example.com"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Nama Pengguna</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Nama pengguna" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Nomor Telepone</FormLabel>
                  <FormControl>
                    <Input id="phone" placeholder="Nomor telepone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="role" className="mb-4">
                    Role
                  </FormLabel>
                  <Controller
                    control={form.control}
                    name="role"
                    render={({ field: { onChange, value, name } }) => (
                      <Select
                        onValueChange={onChange}
                        value={value}
                        name={name}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={value} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="active" className="mb-4">
                    Status
                  </FormLabel>
                  <Controller
                    control={form.control}
                    name="active"
                    render={({ field: { onChange, value, name } }) => (
                      <Select
                        onValueChange={onChange}
                        value={value}
                        name={name}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              value === "true" ? "Active" : "Not Active"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="false">Not Active</SelectItem>
                            <SelectItem value="true">Active</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
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
