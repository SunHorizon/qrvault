'use client'

import React, { useState, DragEvent } from "react";
import { uploadFile } from "@/lib/uploadToSupabase";
import { QRCodeSVG } from "qrcode.react";
import { FiUploadCloud } from "react-icons/fi";



export default function UploadArea({ userId }: { userId: string}){
    const [file, setFile] = useState<File | null>(null);
    const [qrUrl, setQrUrl] = useState<String | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<String | null>(null);



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
        setQrUrl(null);
        setError(null);
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(e.dataTransfer.files?.[0]){
            setFile(e.dataTransfer.files[0]);
            setQrUrl(null);
            setError(null);
        }
    }

    const handleUpload = async () => {
        if (!file) return
        setIsUploading(true);
        setError(null);

        try{
            const result = await uploadFile(file, userId);
            setQrUrl(result.publicUrl);
        }catch(err: any){
            setError(err.message || 'Upload failed')
        }finally{
            setIsUploading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload a file</h2>
            <p className="text-gray-600 mb-6">Choose a file to upload. A QR code will be generated for easy downloading</p>

            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition mb-4"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <FiUploadCloud className="text-4xl mx-auto text-blue-500 mb-2" />
                <p className="text-gray-500">
                    Drag & drop a file here, or{' '}
                    <label htmlFor="file-upload" className="text-blue-600 underline cursor-pointer">
                        browse
                    </label>
                </p>
                <input 
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                />
                {file && (
                    <p className="mt-2 text-sm text-gray-500">
                        Selected file: <span className="font-medium">{file.name}</span>
                    </p>
                )}
            </div>
            
            <button 
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
                {isUploading ? 'Uploading...' : 'Upload'}
            </button>

            {error && <p className="text-red-500 mt-3">{error}</p>}

            {qrUrl && (
                <div className="mt-8 text-center"> 
                    <p className="text-gray-700 mb-3">✅ File uploaded! Scan the QR code to download:</p>
                    <QRCodeSVG className="ml-auto mr-auto" value={qrUrl as string} size={200} />
                    <p className="text-sm mt-4 text-blue-600 break-words">
                        <a href={qrUrl as string} target="_blank" rel="noopener noreferrer" className="underline">
                            {qrUrl}
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}