"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { TableBody, TableRow, TableCell } from "../ui/table";

export default function TabelPresence({
  presences,
  search: name,
}: {
  presences: any;
  search?: string;
}) {
  const filteredPresences = name
    ? presences.filter((presence: any) =>
        presence.user.name.toLowerCase().includes(name.toLowerCase())
      )
    : presences;
  return (
    <TableBody>
      {filteredPresences.map((presence: any, index: number) => (
        <TableRow key={index}>
          <TableCell className="font-medium">{presence.user.name}</TableCell>
          <TableCell>
            <Badge variant="outline">{presence.status}</Badge>
          </TableCell>
          <TableCell className="font-medium">
            {new Date(presence.time).toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Link href={presence.photo} target="_blank" className="underline">
              {presence.photo}
            </Link>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Link
              href={`https://www.google.com/maps?q=${presence.lat},${presence.long}`}
              className="underline"
              target="_blank"
            >
              {presence.lat} - {presence.long}
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
