'use client'

import React, { useRef } from "react"
import { QRCodeSVG } from "qrcode.react";
import { toPng } from 'html-to-image';


export default function UploadCard({
    file,
}: {
    file: {
        id: string
        name: string
        publicUrl: string
        createdAt: string
    }
}){
    const qrRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!qrRef.current) return
        const dataUrl = await toPng(qrRef.current);
        const link = document.createElement('a');
        link.download = `${file.name}-qr.png`;
        link.href = dataUrl;
        link.click();
    }

    const handlePrint = async () => {
        if (!qrRef.current) return

        try{
            const dataUrl = await toPng(qrRef.current);
            const printWindow = window.open('', '_blank', 'width=600,height=800');

            if(printWindow){
                const img = new Image();
                img.src = dataUrl
                img.style.maxWidth = '100%'
                img.style.margin = '40px auto'
                img.style.display = 'block'

                printWindow.document.body.style.textAlign = 'center'
                printWindow.document.body.appendChild(img)
    
                img.onload = () => {
                    printWindow?.focus()
                    printWindow?.print()
                }
            }

        } catch (err){
            console.error('Print failed:', err)
        }
    }


    return (
         <div className='bg-white shadow rounded-lg p-4 flex flex-col items-center text-center'>
            <div ref={qrRef}>
                <QRCodeSVG className="ml-auto mr-auto" value={file.publicUrl} size={150} />
                <h2 className='mt-4 font-semibold text-gray-800'>{file.name}</h2>
            </div>
            <p className='text-sm text-gray-800 mt-1'>
                Uploaded: {new Date(file.createdAt).toLocaleDateString()}
            </p>
            <a href={file.publicUrl} target="_blank" rel="noopener noreferrer" className="mt-3 text-blue-600 underline text-sm">
                Download File
            </a>

            <div className="mt-4 flex gap-3">
                <button 
                    onClick={handleDownload}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Download QR
                </button>
                <button 
                    onClick={handlePrint}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Print QR
                </button>
            </div>
        </div>
    )


}