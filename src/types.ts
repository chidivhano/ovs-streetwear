/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number; // in South African Rands (ZAR / R)
  category: 'Caps' | 'T-Shirts' | 'Beanies' | 'Hoodies';
  description: string;
  features: string[];
  color: string;
  bgImage: string; // Featured image for thumbnail
  images: string[]; // Additional detailed view images
  sizes: string[];
  inStock: boolean;
  rating: number;
}

export interface CartItem {
  id: string; // combination of product.id and size selected
  product: Product;
  size: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  location: string; // e.g. "Braamfontein", "Cape Town"
}

export interface FAQ {
  question: string;
  answer: string;
}
