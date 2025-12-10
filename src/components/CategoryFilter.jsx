export function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
    return (
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => onSelectCategory('All')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === 'All'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
