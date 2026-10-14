import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Accessories from './pages/Accessories';
import Catalog from './pages/Catalog';
import Blog from './pages/Blog';
import About from './pages/About';
import FAQ from './pages/FAQ';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import CatalogManagement from './pages/admin/CatalogManagement';
import AccessoryManagement from './pages/admin/AccessoryManagement';
import BlogManagement from './pages/admin/BlogManagement';
import TestimonialManagement from './pages/admin/TestimonialManagement';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes - No Header/Footer */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="/admin/catalogs" element={<CatalogManagement />} />
        <Route path="/admin/accessories" element={<AccessoryManagement />} />
        <Route path="/admin/blogs" element={<BlogManagement />} />
        <Route path="/admin/testimonials" element={<TestimonialManagement />} />
        
        {/* Public Routes - With Header/Footer */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<Blog />} />
              </Routes>
            </main>
            <Footer />
            <FloatingContact />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
