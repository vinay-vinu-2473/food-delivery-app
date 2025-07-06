import AdminLayout from '../../../components/Admin/AdminLayout';
import OrderManager from '../../../components/Admin/OrderManager';

export default function AdminOrdersPage() {
  return (
    <AdminLayout title="Manage Orders">
      <OrderManager />
    </AdminLayout>
  );
}