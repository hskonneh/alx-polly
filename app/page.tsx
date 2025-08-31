import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ALX Polly
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create and share polls with ease
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center sm:items-start">
          <h2 className="text-lg font-semibold text-gray-900">Get Started</h2>
          <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left space-y-2">
            <li className="tracking-[-.01em]">
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                Sign in
              </Link>{" "}
              or{" "}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
                create an account
              </Link>
            </li>
            <li className="tracking-[-.01em]">
              <Link href="/polls" className="text-blue-600 hover:text-blue-500">
                Browse existing polls
              </Link>
            </li>
            <li className="tracking-[-.01em]">
              <Link href="/polls/new" className="text-blue-600 hover:text-blue-500">
                Create your first poll
              </Link>
            </li>
            <li className="tracking-[-.01em]">
              Developer Hassan S. Konneh. 😎✌🏽
            </li>
            <li>
              The other developer is Queen Amoateng😁
            </li>
          </ol>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/polls">
            <Button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logomark"
                width={20}
                height={20}
              />
              View Polls
            </Button>
          </Link>
          <Link href="/polls/new">
            <Button variant="outline" className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
              Create Poll
            </Button>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/polls"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Polls
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/auth/login"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Sign In
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/auth/register"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Register →
        </Link>
      </footer>
    </div>
  );
}
