import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center gap-8">
      <h1 className="font-semibold text-6xl">Presence App</h1>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </main>
  );
}
