'use client'

import { useState } from "react"
import { signup } from "./action"
import { useRouter } from "next/router"

export default function SignUpPage(){
    const [confirmationSent, setConfirmationSent] = useState(false);
    const [error, setError] = useState<string | null>(null)

    async function handleSignUp(formData: FormData){
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        try{
            await signup(email, password);
            setConfirmationSent(true);
        }catch(error: any){
            setError(error.message);
        }
     
    }

      return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                action={handleSignUp}
                className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6"
            >
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Create Your Account</h2>
            {confirmationSent ? (
                <p className="text-green-600 text-center font-medium">
                    ✅ Signup successful! Please check your email to verify your account.
                </p>
            ): (
                <>
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
                    Sign Up
                </button>
                
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                </>
            )}
            </form>
        </div>
    );
}