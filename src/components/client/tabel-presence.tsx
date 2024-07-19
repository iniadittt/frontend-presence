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
            {new Date(presence.time)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ")} (WIB)
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Link
              href={presence.photo}
              target="_blank"
              className="underline text-blue-500"
            >
              Lihat foto
            </Link>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Link
              href={`https://www.google.com/maps?q=${presence.lat},${presence.long}`}
              className="underline text-blue-500"
              target="_blank"
            >
              Lihat lokasi
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
