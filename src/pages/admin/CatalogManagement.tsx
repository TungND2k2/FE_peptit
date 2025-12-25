import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { Catalog } from '@/types';
import { catalogService } from '@/services/catalogService';

const CatalogManagement = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCatalog, setEditingCatalog] = useState<Catalog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const data = await catalogService.getAll();
      setCatalogs(data.filter(c => !c.isDeleted));
    } catch (error) {
      console.error('Error fetching catalogs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCatalog) {
        const catalogId = (editingCatalog as any)._id || editingCatalog.id;
        await catalogService.update(catalogId, {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        });
      } else {
        await catalogService.create({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        });
      }
      setShowModal(false);
      setEditingCatalog(null);
      resetForm();
      fetchCatalogs();
    } catch (error) {
      console.error('Error saving catalog:', error);
    }
  };

  const handleEdit = (catalog: Catalog) => {
    setEditingCatalog(catalog);
    setFormData({
      title: catalog.title,
      name: catalog.name,
      description: catalog.description,
      price: catalog.price?.toString() || '',
      stock: catalog.stock?.toString() || '',
      imageUrl: catalog.imageUrl,
    });
    setShowModal(true);
  };

  const handleDelete = async (catalog: Catalog) => {
    if (!confirm('Are you sure you want to delete this catalog?')) return;
    
    try {
      const catalogId = (catalog as any)._id || catalog.id;
      await catalogService.delete(catalogId);
      fetchCatalogs();
    } catch (error) {
      console.error('Error deleting catalog:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: '',
    });
  };

  const filteredCatalogs = catalogs.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
              Catalogs
            </h1>
            <p className="text-gray-600 font-body">
              Manage fabric catalogs
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingCatalog(null);
              resetForm();
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-body font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Catalog</span>
          </motion.button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search catalogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
            />
          </div>
        </div>

        {/* Catalogs Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-body">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-body">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-body">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-body">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-body">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCatalogs.map((catalog) => (
                  <tr key={(catalog as any)._id || catalog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={catalog.imageUrl}
                        alt={catalog.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 font-body">{catalog.title}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-body">${catalog.price}</td>
                    <td className="px-6 py-4 text-gray-900 font-body">{catalog.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(catalog)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(catalog)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                {editingCatalog ? 'Edit Catalog' : 'Add New Catalog'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Price ($)</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Stock</label>
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-body"
                  />
                </div>
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingCatalog(null);
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
                    {editingCatalog ? 'Update' : 'Create'}
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

export default CatalogManagement;
