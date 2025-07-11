import { supabase } from './supabaseClient'


export async function uploadFile(file: File, userId: string){
    const filePath = `${userId}/${Date.now()}-${file.name}`
    
    const { data, error } = await supabase.storage.from('qrcodes').upload(filePath, file);

    if(error) throw new Error(error.message);

    const { data: publicUrlData } = supabase.storage.from('qrcodes').getPublicUrl(filePath);

    return {
        filePath,
        publicUrl: publicUrlData?.publicUrl
    }

}