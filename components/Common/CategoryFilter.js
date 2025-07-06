import { useRouter } from 'next/router';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'burger', name: 'Burgers' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'salad', name: 'Salads' },
];

export default function CategoryFilter() {
  const router = useRouter();
  const currentCategory = router.query.category || 'all';

  const handleCategoryChange = (categoryId) => {
    const query = { ...router.query };
    if (categoryId === 'all') {
      delete query.category;
    } else {
      query.category = categoryId;
    }
    router.push({
      pathname: '/menu',
      query,
    });
  };

  return (
    <div className="flex space-x-2 overflow-x-auto py-2">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            currentCategory === category.id
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}