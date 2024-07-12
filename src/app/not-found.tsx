"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <div className="flex w-full flex-col items-center justify-center px-4 md:px-6">
        <div className="max-w-max space-y-4 text-center">
          <Image
            src="/notfound.png"
            alt="404 Not Found"
            width={640}
            height={360}
            priority={true}
          />
          <p className="text-lg text-zinc-500">
            Oops, the page youre looking for doesnt exist.
          </p>
          <Button onClick={() => router.back()}>Return to previous page</Button>
        </div>
      </div>
    </main>
  );
}
