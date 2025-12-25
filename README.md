# Peptit Frontend - Smocked Dresses Shop

Beautiful React + TypeScript frontend for a children's smocked dress shop.

## 🎀 Features

- **Modern Design**: Beautiful UI with pastel colors perfect for children's clothing
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Product Catalog**: Browse smocked dresses with filtering and search
- **Accessories Section**: Shop for buttons, threads, and laces
- **Fabric Catalog**: Explore high-quality fabrics
- **Blog**: Read articles and tips about smocked dresses
- **Smooth Animations**: Enhanced UX with Framer Motion

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - API calls
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
cd frontend
npm install
```

## 🎨 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

```bash
npm run build
```

## 🎯 Project Structure

```
src/
├── components/       # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── pages/           # Page components
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Accessories.tsx
│   ├── Catalog.tsx
│   └── Blog.tsx
├── services/        # API services
│   ├── api.ts
│   ├── productService.ts
│   ├── accessoryService.ts
│   ├── catalogService.ts
│   ├── categoryService.ts
│   └── blogService.ts
├── types/           # TypeScript types
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Color Palette

- **Pink**: #FFB6C1 - Primary color for smocked dresses
- **Lavender**: #E6E6FA - Soft, elegant backgrounds
- **Mint**: #B0E0C3 - Fresh, clean accents
- **Peach**: #FFDAB9 - Warm, inviting tones
- **Sky Blue**: #87CEEB - Calm, trustworthy

## 📱 Pages

1. **Home** - Hero section, featured products, latest blogs
2. **Products** - Product grid with search and category filters
3. **Product Detail** - Detailed product view with image gallery
4. **Accessories** - Browse buttons, threads, and laces
5. **Catalog** - Fabric collection
6. **Blog** - Articles and news

## 🔗 API Integration

The frontend connects to the backend API with the following endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /accessories` - Get all accessories
- `GET /catalogs` - Get all fabric catalogs
- `GET /categories` - Get all categories
- `GET /blogs` - Get all blog posts

## 🎯 Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:4000/api
```

## ✨ Made with love for children's fashion
