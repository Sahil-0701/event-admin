import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar/>
        <main className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AdminLayout