import { Navbar } from '@/components/Navbar';
import '../globals.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import PrivateRoute from '@/components/PrivateRoute';

export const metadata = {
  title: 'Blogify Dashboard',
  description: 'A Comprehensive Blogging and Content Management Platform',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col sm:flex-row ">
      <PrivateRoute>
        <Sidebar />
        <div className="flex-1 ">
          <Navbar/>
          <div>
          {children}
          </div>
        </div>
      </PrivateRoute>
    </div>
  );
}
