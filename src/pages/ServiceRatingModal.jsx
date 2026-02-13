import { useState } from 'react';
import { X, Star, Send } from 'lucide-react';

export function ServiceRatingModal({ onClose }) {
  const [ratings, setRatings] = useState({
    customerService: 0,
    deliverySpeed: 0,
    productQuality: 0,
    overallExperience: 0,
  });
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'customerService', label: 'Customer Service', description: 'How was our support team?' },
    { id: 'deliverySpeed', label: 'Delivery Speed', description: 'Did you receive your order on time?' },
    { id: 'productQuality', label: 'Product Quality', description: 'Are you satisfied with the products?' },
    { id: 'overallExperience', label: 'Overall Experience', description: 'How was your shopping experience?' },
  ];

  const handleRating = (category, rating) => {
    setRatings(prev => ({ ...prev, [category]: rating }));
  };

  const handleSubmit = () => {
    // Here you would typically send the ratings to your backend
    console.log('Service Ratings:', ratings);
    console.log('Feedback:', feedback);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const getDisplayRating = (category) => {
    if (hoveredCategory === category && hoveredStar !== null) {
      return hoveredStar;
    }
    return ratings[category];
  };

  const averageRating = Object.values(ratings).reduce((a, b) => a + b, 0) / 4;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-slate-900">Rate Our Service</h2>
            <p className="text-slate-600 mt-1">Your feedback helps us improve</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 fill-green-500 text-green-500" />
            </div>
            <h3 className="text-slate-900 mb-2">Thank You!</h3>
            <p className="text-slate-600">
              Your feedback has been submitted successfully.
            </p>
          </div>
        ) : (
          <div className="p-6">
            {/* Rating Categories */}
            <div className="space-y-6 mb-6">
              {categories.map(category => (
                <div key={category.id} className="border-b border-slate-100 pb-6 last:border-0">
                  <div className="mb-3">
                    <h3 className="text-slate-900 mb-1">{category.label}</h3>
                    <p className="text-slate-500 text-sm">{category.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => handleRating(category.id, star)}
                        onMouseEnter={() => {
                          setHoveredCategory(category.id);
                          setHoveredStar(star);
                        }}
                        onMouseLeave={() => {
                          setHoveredCategory(null);
                          setHoveredStar(null);
                        }}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= getDisplayRating(category.id)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    {ratings[category.id] > 0 && (
                      <span className="ml-3 text-slate-600">
                        {ratings[category.id]}/5
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Rating Display */}
            {averageRating > 0 && (
              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Overall Rating</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(averageRating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-900">
                      {averageRating.toFixed(1)}/5
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback Text Area */}
            <div className="mb-6">
              <label htmlFor="feedback" className="block text-slate-700 mb-2">
                Additional Feedback (Optional)
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us more about your experience..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={Object.values(ratings).every(r => r === 0)}
              className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Rating
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
