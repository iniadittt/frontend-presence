"use client";

import React from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EllipsisIcon, EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { deleteUser } from "@/lib/services/user";
import { useRouter } from "next/navigation";

export default function UserAction({
  id,
  email,
}: {
  id: number;
  email: string;
}) {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  async function handlerDelete(e: any, id: number) {
    setIsDeleting(true);
    try {
      e.preventDefault();
      const response = await deleteUser(session!.user.token, id);
      if (response.code !== 200) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="sm" variant="ghost">
            <EllipsisIcon size={12} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link
              href={`/admin/users/${id}/edit`}
              className="flex cursor-pointer flex-row items-center"
            >
              <PencilIcon size={14} className="mr-2" />
              Edit User
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/admin/users/${id}/password`}
              className="flex cursor-pointer flex-row items-center"
            >
              <PencilIcon size={14} className="mr-2" />
              Ubah Password
            </Link>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="flex cursor-pointer flex-row items-center">
              <Trash2Icon size={14} className="mr-2 text-destructive" />
              <span className="text-destructive">Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi hapus user</DialogTitle>
          <DialogDescription>
            Apakah anda yakin untuk mengahapus user dengan email{" "}
            <span className="font-bold">{email}</span>. User yang telah dihapus
            tidak dapat dikembalikan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={(e) => handlerDelete(e, id)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
