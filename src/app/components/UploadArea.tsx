'use client'

import React, { useState } from "react";
import { uploadFile } from "@/lib/uploadToSupabase";
import { QRCodeSVG } from "qrcode.react";



export default function UploadArea({ userId }: { userId: string}){
    const [file, setFile] = useState<File | null>(null);
    const [qrUrl, setQrUrl] = useState<String | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<String | null>(null);



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
        setQrUrl(null);
    }

    const handleUpload = async () => {
        if (!file) return
        setIsUploading(true);
        setError(null);

        try{

        }catch(err: any){
            const result = await uploadFile(file, userId);
            setQrUrl(result.publicUrl);
        }finally{
            setIsUploading(false);
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
            <input 
                type="file"
                onChange={handleFileChange}
                className="mb-4 block w-full text-sm"
            />
            <button 
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isUploading ? 'Uploading...' : 'Upload'}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}


            {qrUrl && (
                <div className="mt-6 text-center"> 
                    <p className="text-gray-700 mb-2">Scan to download:</p>
                    <QRCodeSVG value={qrUrl as string} size={200} />
                    <p className="text-sm mt-2 text-blue-600 break-all">{qrUrl}</p>
                </div>
            )}
        </div>
    );
}