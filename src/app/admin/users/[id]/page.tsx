import React from "react";
import NotFound from "@/app/not-found";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getUser } from "@/lib/services/user";
import { Dashboard } from "@/components/client/dashboard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertDialogComponent } from "@/components/client/alert-dialog";
import { Service } from "@/lib/types/alert";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon } from "lucide-react";
import { redirect } from "next/navigation";
import SessionProvider from "@/app/Provider";
import Link from "next/link";

export default async function DetailUser({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const response = await getUser(session!.user.token, id);
  if (response.code === 401) return redirect("/login");
  if (response.code !== 200) return <NotFound />;
  const user = response.data.user;

  return (
    <>
      <Dashboard>
        <div className="m-4 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/admin/users">
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="flex items-center gap-2 md:ml-auto"></div>
          </div>
          <Card className="w-full">
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Detail Pengguna</CardTitle>
                <div className="flex justify-between">
                  <p className="text-sm">
                    Detail pengguna dengan email{" "}
                    <span className="font-semibold">{user.email}</span>
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Link href={`/admin/users/${user.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <SessionProvider session={session}>
                  <AlertDialogComponent
                    buttonType="hapus"
                    name="Hapus"
                    title="Konfirmasi hapus user"
                    description={`Apakah anda yakin untuk mengahapus user dengan email ${user.email}. User yang telah dihapus tidak dapat dikembalikan.`}
                    service={Service.users}
                    id={user.id}
                  />
                </SessionProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col flex=col gap-6">
                <div className="grid grid-cols-2 w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Alamat Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Alamat Email"
                      value={user.email}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nama Pengguna</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Nama Pengguna"
                      value={user.name}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phone">Nomor Telepone</Label>
                    <Input
                      type="text"
                      id="phone"
                      placeholder="Nomor Telepone"
                      value={user.phone}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      type="text"
                      id="role"
                      placeholder="role"
                      value={
                        user.role.charAt(0).toUpperCase() + user.role.slice(1)
                      }
                      disabled
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="active">Status</Label>
                    <Input
                      type="text"
                      id="active"
                      placeholder="active"
                      value={user.active ? "Active" : "Not Active"}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </div>
      </Dashboard>
    </>
  );
}
