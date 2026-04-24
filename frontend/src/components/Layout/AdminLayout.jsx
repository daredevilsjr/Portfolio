import { Outlet } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <AdminNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
