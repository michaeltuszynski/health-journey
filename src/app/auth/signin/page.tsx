"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-10 rounded-xl shadow-lg bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Health Journey Tracker
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to start your journey
          </p>
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}