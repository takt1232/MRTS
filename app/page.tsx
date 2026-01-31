"use client";

import { useActionState } from "react";
import { loginAction } from "./(auth)/actions";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            MRTS Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your Team Code to continue
          </p>
        </div>

        <form action={action} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="team_code"
                className="block text-sm font-medium text-gray-700"
              >
                Team Code
              </label>
              <input
                id="team_code"
                name="team_code"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g. SALES-TEAM"
              />
            </div>
            <div>
              <label
                htmlFor="user_code"
                className="block text-sm font-medium text-gray-700"
              >
                User Code
              </label>
              <input
                id="user_code"
                name="user_code"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your user code"
              />
            </div>
          </div>

          {state?.error && (
            <div className="text-center text-sm text-red-600">
              {state.error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isPending ? "Verifying..." : "Enter Team Area"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
