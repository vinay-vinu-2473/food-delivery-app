import AdminLayout from '../../../components/Admin/AdminLayout';
import FoodManager from '../../../components/Admin/FoodManager';

export default function AdminFoodsPage() {
  return (
    <AdminLayout title="Manage Food Items">
      <FoodManager />
    </AdminLayout>
  );
}