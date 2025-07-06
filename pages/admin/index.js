import AdminLayout from '../../components/Admin/AdminLayout';

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total Orders</h3>
            <p className="text-3xl font-bold">124</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">$2,458.75</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Active Users</h3>
            <p className="text-3xl font-bold">87</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}