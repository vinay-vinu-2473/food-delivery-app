import AdminLayout from '../../../components/Admin/AdminLayout';
import UserManager from '../../../components/Admin/UserManager';

export default function AdminUsersPage() {
  return (
    <AdminLayout title="Manage Users">
      <UserManager />
    </AdminLayout>
  );
}