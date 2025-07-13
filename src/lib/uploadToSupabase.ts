'use server'

import { supabase } from './supabaseClient'
import { PrismaClient } from '@/generated/prisma';



export async function uploadFile(file: File, userId: string){
    const filePath = `${userId}/${file.name}`
    const prisma = new PrismaClient()
    
    // upload file to supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
    .from('files')
    .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
    });
    if (uploadError) throw new Error(`Upload error: ${uploadError.message}`);

    // Get public file URL
    const { data: publicUrlData } = supabase.storage.from('files').getPublicUrl(filePath);
    if(!publicUrlData.publicUrl) throw new Error('Failed to get pubilc URL');

    // save the metadata to the database
    const record = await prisma.file.create({
        data: {
            name: file.name,
            path: filePath,
            publicUrl: publicUrlData.publicUrl,
            userId: userId,
        },
    })


    return {
        publicUrl: publicUrlData?.publicUrl,
        fileId: record.id,
    }

}