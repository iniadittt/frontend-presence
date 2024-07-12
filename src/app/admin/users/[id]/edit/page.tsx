import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getUser } from "@/lib/services/user";
import { Dashboard } from "@/components/client/dashboard";
import NotFound from "@/app/not-found";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import FormEditUser from "@/components/client/edit-user";

export default async function EditUser({
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Edit Pengguna</CardTitle>
            <div className="flex justify-between">
              <p className="text-sm">
                Edit penggunakan dengan email{" "}
                <span className="font-semibold">{user.email}</span>
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <FormEditUser user={user} />
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </Dashboard>
    </>
  );
}
