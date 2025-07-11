import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import UploadArea from '../components/UploadArea'


export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>Upload a File</h1>
      <UploadArea userId={user.id} />
    </div>
  )
}