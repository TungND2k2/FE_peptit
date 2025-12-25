export interface Product {
  id: string;
  name: string;
  title: string;
  idAdmin: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  idCategory: string;
  images: string[];
  isActive?: boolean;
  isDeleted?: boolean;
  attributes?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface Accessory {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  isActive?: boolean;
  isDeleted?: boolean;
  type: 'button' | 'thread' | 'lace';
  material?: string;
  color?: string;
  width?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Catalog {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  title: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string | null;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: Date | null;
  thumbnailUrl: string | null;
  imageUrls: string[];
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  id?: string;
  _id?: string;
  imageUrl: string;
  customerName?: string;
  content?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}
