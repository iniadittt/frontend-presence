import React from "react";
import { Dashboard } from "@/components/client/dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import AddUserForm from "@/components/client/add-user";

export default async function AddUserPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Dashboard>
        <AddUserForm />
      </Dashboard>
    </>
  );
}
