'use client'

import { createClient } from '@/lib/supabase-browser';
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from 'react';
import { fetchUserFiles } from './actions';
import UploadCard from '@/app/components/UploadCard';


export default function UploadsPage() {
  const [userId, setUserId] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);

  const [files, setFiles] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  useEffect(()  => {
    const supaBase = createClient();
    supaBase.auth.getUser().then(({ data }) => {
      const uid = data.user?.id;
      if(uid) setUserId(uid);
    })
  }, [])

  useEffect(() => {
    if(!userId) return;

    const fetch = async () => {
      const result = await fetchUserFiles({
        userId,
        search,
        startDate,
        endDate,
        page,
        pageSize,
      })
      setFiles(result.files);
      setTotalPages(result.totalPage)
    }
    fetch();
  }, [userId, search, startDate, endDate, page])


  return (
    <div>
      <h1 className='text-2xl font-semibold mb-4 text-gray-800'>My Uploads</h1>
      <div className='mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <input 
          type='text'
          placeholder='Search by file name...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className='border px-3 py-2 rounded w-full'
        />
        <input 
          type='date'
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value)
            setPage(1)
          }}
          className='border px-3 py-2 rounded w-full'
        />
        <input 
          type='date'
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value)
            setPage(1)
          }}
          className='border px-3 py-2 rounded w-full'
        />
      </div>

     
      {files.length === 0 ? (
        <p className='text-gray-500 mt-6'>No files Uploaded or match your filters.</p>
      ): (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {files.map((file) => (
              <UploadCard key={file.id} file={file}/>
            ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex justify-center mt-8 space-x-4'>
          <button 
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50'
          >
            Pervious
          </button>
          <span className='self-center text-gray-700'>
            Page {page} of {totalPages}
          </span>
          <button 
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50'
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}