"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/lib/services/user";
import { AlertType } from "@/lib/types/alert";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Service } from "@/lib/types/alert";
import toast from "react-hot-toast";  // Import toast for notifications

export function AlertDialogComponent({
  buttonType,
  name,
  title,
  description,
  service,
  id,
}: AlertType) {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  async function handlerClick(e: any) {
    try {
      setIsLoading(true);
      if (status === "authenticated" && service === Service.users) {
        const response = await deleteUser(session!.user.token, id);
        if (response.code !== 200) {
          toast.error(response.message);
          return;
        }
        toast.success(`Penggunakan dengan id ${id} berhasil dihapus!`);
        router.push("/admin/users");
        router.refresh()
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={buttonType === "hapus" ? "destructive" : "default"}>
          {name}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handlerClick} disabled={isLoading}>
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
