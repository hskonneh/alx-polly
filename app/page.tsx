import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 sm:p-8">
      {/* Optional: Add a subtle background pattern or image here */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/next.svg" // Replace with a more suitable background image if available
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          className="pointer-events-none"
        />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-16 px-6 sm:px-10 bg-white/20 backdrop-blur-md rounded-xl shadow-2xl border border-white/30">
        <div className="mb-8">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight mb-4">
            Welcome to{" "}
            <span className="text-yellow-200 drop-shadow-lg">PollPall!</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white font-light">
            Create, share, and analyze polls with unparalleled ease and insight.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/polls" passHref>
            <Button className="h-12 px-8 text-lg font-semibold rounded-full bg-yellow-400 hover:bg-yellow-500 text-purple-800 shadow-lg transition-all duration-300 transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500">
              View Polls
            </Button>
          </Link>
          <Link href="/polls/new" passHref>
            <Button
              variant="outline"
              className="h-12 px-8 text-lg font-semibold rounded-full border-2 border-yellow-400 text-white bg-transparent hover:bg-yellow-400 hover:text-purple-800 shadow-lg transition-all duration-300 transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500"
            >
              Create Poll
            </Button>
          </Link>
        </div>
      </main>

      <footer className="relative z-10 mt-12 text-center text-white text-sm">
        <p className="flex items-center gap-2 no-underline text-shadow-cyan-200">
          Developed by HS. Konneh.
        </p>
      </footer>
    </div>
  );
}
