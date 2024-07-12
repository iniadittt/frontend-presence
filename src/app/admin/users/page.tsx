import React from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Dashboard } from "@/components/client/dashboard";
import { getUsers } from "@/lib/services/user";
import { User } from "@/lib/types/user";
import { redirect } from "next/navigation";
import UserAction from "@/components/client/user-action";
import NotFound from "@/app/not-found";

export default async function Users() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const response = await getUsers(session!.user.token);
  if (response.code === 401) return redirect("/login");
  if (response.code !== 200 && response.code !== 404) return <NotFound />;
  const users = response.data.users;
  return (
    <>
      <Dashboard>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs>
            <div className="flex items-center mb-4">
              <div className="ml-auto flex items-center gap-2">
                <Link href={"/admin/users/add"}>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Pengguna
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Pengguna</CardTitle>
                <CardDescription>Manajemen pengguna.</CardDescription>
              </CardHeader>
              <CardContent>
                {response.code === 404 ? (
                  <p className="text-sm font-semibold">{response.message}</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Alamat Email</TableHead>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Role
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Phone
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Status
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user: User, index: number) => {
                        if (user.email !== "admin@presence.com") {
                          return (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                <Link
                                  href={`/admin/users/${user.id}`}
                                  className="underline"
                                >
                                  {user.email}
                                </Link>
                              </TableCell>
                              <TableCell className="font-medium">
                                {user.name}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{user.role}</Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {user.phone}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {user.active ? "Active" : "Not active"}
                              </TableCell>
                              <TableCell>
                                <UserAction id={user.id} email={user.email} />
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </Tabs>
        </main>
      </Dashboard>
    </>
  );
}
