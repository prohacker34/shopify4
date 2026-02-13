import { useState } from 'react';
import { TrendingUp, Sparkles, ShoppingCart, Heart, Clock, MessageSquare } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ServiceRatingModal } from './ServiceRatingModal';

export default function Categories() {
  const [activeTab, setActiveTab] = useState('trending');
  const [showServiceRating, setShowServiceRating] = useState(false);

  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2NTQ0NTg3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Audio',
      rating: 4.5,
      reviewCount: 342,
      userRating: null,
      purchases: 1250,
      likes: 890,
      dateAdded: '2024-12-01',
      trending: true,
    },
    {
      id: '2',
      name: 'Wireless Earbuds Pro',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY1MzgwNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Audio',
      rating: 4.8,
      reviewCount: 567,
      userRating: null,
      purchases: 2100,
      likes: 1450,
      dateAdded: '2025-12-08',
      trending: true,
    },
    {
      id: '3',
      name: 'Smart Watch Series 5',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNofGVufDF8fHx8MTc2NTM4MjQ3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Wearables',
      rating: 4.6,
      reviewCount: 423,
      userRating: null,
      purchases: 980,
      likes: 1890,
      dateAdded: '2025-12-05',
      trending: true,
    },
    {
      id: '4',
      name: 'Ultra Slim Laptop',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjU0MzY5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Computers',
      rating: 4.7,
      reviewCount: 289,
      userRating: null,
      purchases: 3200,
      likes: 756,
      dateAdded: '2024-08-15',
      trending: false,
    },
    {
      id: '5',
      name: 'Professional Camera Kit',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjUzOTQ1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Photography',
      rating: 4.9,
      reviewCount: 612,
      userRating: null,
      purchases: 1560,
      likes: 2340,
      dateAdded: '2024-11-20',
      trending: false,
    },
    {
      id: '6',
      name: 'Phone Case Premium',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1566793474285-2decf0fc182a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2NTQ0NzQyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Accessories',
      rating: 4.3,
      reviewCount: 891,
      userRating: null,
      purchases: 4500,
      likes: 1120,
      dateAdded: '2023-05-10',
      trending: false,
    },
  ]);

  const handleProductRating = (productId, rating) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, userRating: rating } : p
      )
    );
  };

  const getSortedProducts = () => {
    const sorted = [...products];

    switch (activeTab) {
      case 'trending':
        return sorted.filter(p => p.trending).sort((a, b) => b.purchases - a.purchases);
      case 'new':
        return sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case 'purchased':
        return sorted.sort((a, b) => b.purchases - a.purchases);
      case 'liked':
        return sorted.sort((a, b) => b.likes - a.likes);
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
      default:
        return sorted;
    }
  };

  const tabs = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'new', label: 'New Arrivals', icon: Sparkles },
    { id: 'purchased', label: 'Most Purchased', icon: ShoppingCart },
    { id: 'liked', label: 'Most Liked', icon: Heart },
    { id: 'oldest', label: 'Oldest', icon: Clock },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="mb-2">Shop by Category</h1>
              <p className="text-slate-600">
                Explore our curated collection of premium products
              </p>
            </div>
            <button
              onClick={() => setShowServiceRating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Rate Our Service
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <h2 className="text-slate-900">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <p className="text-slate-600">
            {getSortedProducts().length} products available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getSortedProducts().map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onRate={handleProductRating}
            />
          ))}
        </div>

        {getSortedProducts().length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No products found in this category</p>
          </div>
        )}
      </div>

      {/* Service Rating Modal */}
      {showServiceRating && (
        <ServiceRatingModal onClose={() => setShowServiceRating(false)} />
      )}
    </div>
  );
}
