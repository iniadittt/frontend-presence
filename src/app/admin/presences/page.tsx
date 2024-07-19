import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Dashboard } from "@/components/client/dashboard";
import { redirect } from "next/navigation";
import { getPresences } from "@/lib/services/presence";
import TabelPresence from "@/components/client/tabel-presence";
import Search from "@/components/ui/search";

export default async function Pengguna({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const response = await getPresences(session!.user.token);
  if (response.code === 401) return redirect("/login");
  const presences = response.code === 200 ? response.data.presences : [];
  return (
    <>
      <Dashboard>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader className="flex flex-row justify-between">
                <div className="w-full">
                  <CardTitle>Presensi</CardTitle>
                </div>
                <Search placeholder="Search user..." />
              </CardHeader>
              <CardContent>
                {presences.length === 0 ? (
                  <p className="text-sm font-semibold">
                    Data presensi tidak ada
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Waktu</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Photo
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Location
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TabelPresence
                      presences={presences}
                      search={searchParams?.search}
                    />
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
