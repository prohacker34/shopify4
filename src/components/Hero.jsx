import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-white mb-4">
            Welcome to QuickCart
          </h1>
          <p className="mb-8 text-blue-100">
            Discover amazing products at unbeatable prices. Shop the latest electronics, sports gear, and accessories with fast shipping and easy returns.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
