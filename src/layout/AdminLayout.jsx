import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-4 bg-gray-50 md:ml-64 mt-[72px] w-full">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout