'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase-server"


export async function signup(email: string, password: string){
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({email,password})
    if(error) throw new Error(error.message)
    // revalidatePath('/', 'layout')
    // redirect('/')
}