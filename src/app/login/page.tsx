'use client'

import { useState } from "react"
import { login } from "./actions";
import Link from "next/link";


export default function LoginPage(){
     const [error, setError] = useState<string | null>(null)

    async function handleLogin(formData: FormData) {
        const email = formData.get('email') as string;
        const password = formData.get("password") as string;
        try{
            await login(email, password);
        }catch(error){
            console.log(error);
            // setError(error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
           <form
            action={handleLogin}
            className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6"
           >
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Log In to QRVault</h2>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Log In
            </button>

            {/* {error && <p className="text-red-500 text-sm mb-3">{error}</p>} */}

            <p className="text-sm text-center text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:underline">
                    Sign Up
                </Link>
            </p>
           </form>
        </div>
    )

}