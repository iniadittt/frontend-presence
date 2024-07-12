import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getMyProfile } from "@/lib/services/user";
import { Dashboard } from "@/components/client/dashboard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import NotFound from "@/app/not-found";
import FormEditProfilePassword from "@/components/client/edit-profile-password";

export default async function EditPasswordMe() {
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Edit Password</CardTitle>
            <div className="flex justify-between">
              <p className="text-sm">
                Edit password penggunakan dengan email{" "}
                <span className="font-semibold">{user.email}</span>
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <FormEditProfilePassword user={user} />
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </Dashboard>
    </>
  );
}
