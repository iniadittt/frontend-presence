import React from "react";
import { Dashboard } from "@/components/client/dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getDataDashboard } from "@/lib/services/dashboard";
import NotFound from "../not-found";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const response = await getDataDashboard(session!.user.token);
  if (response.code === 401) return redirect("/login");
  if (response.code !== 200) return <NotFound />;
  const data = response.data;
  return (
    <>
      <Dashboard>
        <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
          <Card>
            <CardHeader>
              <CardDescription>Jumlah Pengguna</CardDescription>
              <CardTitle>{data.user}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Jumlah Presensi Hari Ini</CardDescription>
              <CardTitle>{data.presence}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Jumlah Laporan</CardDescription>
              <CardTitle>{data.laporan}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </Dashboard>
    </>
  );
}
