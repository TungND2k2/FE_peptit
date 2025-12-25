import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { Testimonial } from '@/types';
import { testimonialService } from '@/services/testimonialService';

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: '',
    customerName: '',
    content: '',
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialService.getAll();
      setTestimonials(data.filter(t => !t.isDeleted));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await testimonialService.create(formData);
      setShowModal(false);
      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error('Error creating testimonial:', error);
    }
  };

  const handleDelete = async (testimonial: Testimonial) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const testimonialId = (testimonial as any)._id || testimonial.id;
      await testimonialService.delete(testimonialId);
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      imageUrl: '',
      customerName: '',
      content: '',
      rating: 5,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
              Testimonials
            </h1>
            <p className="text-gray-600 font-body">
              Manage customer review images
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-body font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Testimonial</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={(testimonial as any)._id || testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group relative"
            >
              <div className="aspect-square">
                <img
                  src={testimonial.imageUrl}
                  alt="Customer testimonial"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 font-body">{testimonial.customerName || 'Anonymous'}</h3>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                {testimonial.content && (
                  <p className="text-sm text-gray-600 font-body line-clamp-2">{testimonial.content}</p>
                )}
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(testimonial)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}

          {testimonials.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
              <ImageIcon className="w-16 h-16 mb-4" />
              <p className="text-lg font-body">No testimonials yet</p>
              <p className="text-sm font-body">Add customer review images to display on the homepage</p>
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Add New Testimonial
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
                    placeholder="Sarah Johnson"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                    Review Content
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
                    placeholder="Beautiful dress, my daughter loves it!"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                    Rating
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                    Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {formData.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-gray-200 max-h-48">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '';
                        e.currentTarget.alt = 'Invalid image URL';
                        e.currentTarget.className = 'w-full h-48 object-cover bg-gray-100 flex items-center justify-center text-gray-400';
                      }}
                    />
                  </div>
                )}
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-body font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-body font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Add Testimonial
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TestimonialManagement;
