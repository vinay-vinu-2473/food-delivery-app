import Link from 'next/link';
import { useRouter } from 'next/router';

const adminLinks = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Food Items', href: '/admin/foods' },
  { name: 'Orders', href: '/admin/orders' },
  { name: 'Users', href: '/admin/users' },
];

export default function AdminNav() {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {adminLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <a
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        router.pathname === link.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}