import React from "react";
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
import { redirect } from "next/navigation";
import { getReports } from "@/lib/services/report";
import NotFound from "@/app/not-found";

export default async function Reports() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const response = await getReports(session!.user.token);
  if (response.code === 401) return redirect("/login");
  if (response.code !== 200 && response.code !== 404) return <NotFound />;
  const reports = response.data.reports;
  return (
    <>
      <Dashboard>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Manajemen reports.</CardDescription>
              </CardHeader>
              <CardContent>
                {response.code === 404 ? (
                  <p className="text-sm font-semibold">{response.message}</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Description
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          User
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports.map((report: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {report.title}
                          </TableCell>
                          <TableCell className="font-medium">
                            {report.description}
                          </TableCell>
                          <TableCell className="font-medium">
                            {report.user.name} - {report.user.email}
                          </TableCell>
                        </TableRow>
                      ))}
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
