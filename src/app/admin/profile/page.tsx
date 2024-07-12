import React from "react";
import NotFound from "@/app/not-found";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
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
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { getMyProfile } from "@/lib/services/user";
import Link from "next/link";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const response = await getMyProfile(session!.user.token);
  if (response.code === 401) return redirect("/login");
  if (response.code !== 200) return <NotFound />;
  const user = response.data.user;
  return (
    <>
      <Dashboard>
        <div className="m-4 flex flex-col gap-6">
          <Card className="w-full">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle>Profile Saya</CardTitle>
              <div className="flex justify-end gap-2">
                <Link href={`/admin/profile/password`}>
                  <Button variant="outline">Ubah Password</Button>
                </Link>
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
                      value="Active"
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
