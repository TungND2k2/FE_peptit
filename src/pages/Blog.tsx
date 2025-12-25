import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Blog } from '@/types';
import { blogService } from '@/services/blogService';

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await blogService.getAll();
        setBlogs(data.filter(b => b.isPublished && !b.isDeleted));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get all unique tags
  const allTags = Array.from(
    new Set(blogs.flatMap((blog) => blog.tags))
  );

  const filteredBlogs = blogs.filter((blog) => {
    if (selectedTag === 'all') return true;
    return blog.tags.includes(selectedTag);
  });

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-smocked-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-smocked-lavender to-smocked-blue py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Blog & News
            </h1>
            <p className="text-lg text-gray-700 font-body max-w-2xl mx-auto">
              Discover stories, tips and insights about smocked dresses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <section className="py-8 bg-white shadow-sm sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-4 py-2 rounded-full font-body font-semibold transition flex items-center space-x-1 ${
                  selectedTag === 'all'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>All</span>
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full font-body font-semibold transition flex items-center space-x-1 ${
                    selectedTag === tag
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Tag className="w-4 h-4" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 overflow-hidden group"
                >
                  <Link to={`/blog/${blog.id}`}>
                    <div className="relative overflow-hidden aspect-[16/9] bg-gradient-to-br from-smocked-pink to-smocked-lavender">
                      {blog.thumbnailUrl ? (
                        <img
                          src={blog.thumbnailUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl">📝</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-6">
                      {/* Tags */}
                      {blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-smocked-rose text-primary-600 px-3 py-1 rounded-full font-body"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 className="font-display text-xl font-semibold text-gray-800 mb-3 group-hover:text-primary-600 transition line-clamp-2">
                        {blog.title}
                      </h2>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-body mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{blog.author}</span>
                        </div>
                        {blog.publishedAt && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.publishedAt)}</span>
                          </div>
                        )}
                      </div>

                      {/* Content Preview */}
                      {blog.content && (
                        <p className="text-gray-600 font-body text-sm line-clamp-3 mb-4">
                          {blog.content.substring(0, 150)}...
                        </p>
                      )}

                      <div className="flex items-center text-primary-600 font-body font-semibold group-hover:underline">
                        Read more
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="font-display text-2xl font-semibold text-gray-800 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 font-body">
                {selectedTag === 'all'
                  ? 'Please check back later'
                  : 'Try selecting a different tag'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
