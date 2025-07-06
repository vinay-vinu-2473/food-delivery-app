import { useRouter } from 'next/router';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'burger', name: 'Burgers' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'salad', name: 'Salads' },
  { id: 'drink', name: 'Drinks' },
];

export default function FoodFilter() {
  const router = useRouter();
  const { category = 'all' } = router.query;

  const handleCategoryChange = (catId) => {
    const newQuery = { ...router.query };
    if (catId === 'all') {
      delete newQuery.category;
    } else {
      newQuery.category = catId;
    }
    router.push({
      pathname: '/menu',
      query: newQuery,
    });
  };

  return (
    <div className="flex overflow-x-auto pb-2 space-x-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryChange(cat.id)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
            category === cat.id
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}