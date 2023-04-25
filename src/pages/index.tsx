import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center space-y-10 p-24 ${inter.className}`}
    >
      <h1 className="text-3xl font-bold">Todo List</h1>
      <Link href="/tasks">
        <button className="bg-blue-600 hover:bg-blue-800  py-2 px-4 rounded-md">
          See tasks
        </button>
      </Link>
    </main>
  );
}
