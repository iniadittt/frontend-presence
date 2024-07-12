"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { addUserSchema } from "@/lib/schema/add-user";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addUser } from "@/lib/services/user";

export default function AddUserForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      phone: "",
      role: "user",
    },
  });

  async function onSubmit(values: z.infer<typeof addUserSchema>) {
    setIsSubmit(true);
    try {
      const response = await addUser(session!.user.token, values);
      if (response.code !== 200) {
        toast.error(response.message);
      } else {
        toast.success("Berhasil menambah pengguna baru");
      }
      router.push("/admin/users");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmit(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="grid flex-1 m-4 items-start gap-6 sm:py-0">
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/admin/users">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="flex items-center gap-2 md:ml-auto"></div>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>Tambah Pengguna Baru</CardTitle>
                  <Button size="sm" type="submit" disabled={isSubmit}>
                    Simpan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="email">Alamat Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="email@gmail.com"
                                id="email"
                                disabled={isSubmit}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="name">Nama Pengguna</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nama Pengguna"
                                id="name"
                                disabled={isSubmit}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Password"
                                id="password"
                                disabled={isSubmit}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="phone">
                              Nomor Telepone
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="08**********"
                                id="phone"
                                disabled={isSubmit}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
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
                              render={({
                                field: { onChange, value, name },
                              }) => (
                                <Select
                                  onValueChange={onChange}
                                  value={value}
                                  name={name}
                                  disabled={isSubmit}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder={value} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Role</SelectLabel>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="admin">
                                        Admin
                                      </SelectItem>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </form>
    </Form>
  );
}
