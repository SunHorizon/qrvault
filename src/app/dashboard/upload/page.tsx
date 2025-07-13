import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import UploadArea from "@/app/components/UploadArea";

export default async function UploadPage(){
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) redirect('/login');

    return(
        <div className=''>
        <h1 className='text-2xl font-semibold mb-6 text-gray-800'>Upload a New file</h1>
            <UploadArea userId={user.id} />
        </div>
    )
}