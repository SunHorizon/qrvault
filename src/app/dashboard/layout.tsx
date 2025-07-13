import Link from "next/link";


export default function DashboardLayout({ children }: { children: React.ReactNode }) { 

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-blue-600">QRVault</h1>
                <div className="space-x-4">
                    <Link
                        href="/dashboard/upload"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Upload File
                    </Link>
                    <Link
                        href="/dashboard/uploads"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        My Uploads
                    </Link>
                </div>
            </nav>
            <main className="p-6 max-w-6xl mx-auto">{children}</main>
        </div>

    )
}