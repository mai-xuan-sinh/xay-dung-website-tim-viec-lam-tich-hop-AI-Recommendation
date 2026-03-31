import React, { useState } from 'react';
import { XMarkIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import RatingStars from './RatingStars';

const ReviewForm = ({ company, onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Vui lòng chọn số sao đánh giá');
      return;
    }
    if (!review.trim()) {
      setError('Vui lòng nhập nội dung đánh giá');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit({
        companyId: company.id,
        rating,
        review,
        pros,
        cons,
        anonymous
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            Viết đánh giá về {company.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Rating Stars */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá của bạn <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  {star <= (hoverRating || rating) ? (
                    <StarIconSolid className="h-8 w-8 text-yellow-400" />
                  ) : (
                    <StarIcon className="h-8 w-8 text-gray-300" />
                  )}
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {rating > 0 ? `${rating} sao` : 'Chọn số sao'}
              </span>
            </div>
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nội dung đánh giá <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Chia sẻ trải nghiệm của bạn khi làm việc tại công ty..."
            />
          </div>

          {/* Pros */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ưu điểm
            </label>
            <textarea
              rows="2"
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Những điểm tốt về công ty..."
            />
          </div>

          {/* Cons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nhược điểm
            </label>
            <textarea
              rows="2"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Những điểm cần cải thiện..."
            />
          </div>

          {/* Anonymous */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-600">
              Đăng ẩn danh
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;