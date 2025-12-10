import { Star, ShoppingCart } from 'lucide-react';

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-gray-900 mb-2">{product.name}</h3>

        <p className="text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-700">{product.rating}</span>
          </div>
          <span className="text-gray-500">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-blue-600">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
