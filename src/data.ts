/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review, FAQ } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'ovs-orbit-camper-cap-black',
    name: 'OVS Orbit Camper Cap — Black',
    price: 269,
    category: 'Caps',
    description: 'The OVS Orbit Camper Cap is built for everyday movement. Designed with a lightweight, structured silhouette and finished with the signature OVS emblem, this cap delivers a clean, understated look that complements any fit.',
    features: [
      'Lightweight performance fabric',
      'Classic 5-panel camper construction',
      'Embroidered OVS emblem',
      'Adjustable fit',
      'Everyday streetwear essential'
    ],
    color: 'Black / White Logo',
    bgImage: 'https://i.postimg.cc/kXVLbRDS/OVS-Orbit-Camper-Cap-Black.jpg',
    images: [
      'https://i.postimg.cc/kXVLbRDS/OVS-Orbit-Camper-Cap-Black.jpg'
    ],
    sizes: ['One Size (Adjustable)'],
    inStock: true,
    rating: 4.8
  },
  {
    id: 'ovs-orbit-camper-cap-white',
    name: 'OVS Orbit Camper Cap — White',
    price: 269,
    category: 'Caps',
    description: 'A fresh take on a modern classic. The OVS Orbit Camper Cap in White brings a clean and refined aesthetic to your wardrobe. Featuring the iconic OVS emblem embroidered in contrasting black, this piece is designed for effortless styling and everyday wear.',
    features: [
      'Lightweight performance fabric',
      'Structured 5-panel design',
      'Embroidered OVS emblem',
      'Adjustable closure',
      'Crisp monochrome finish'
    ],
    color: 'White / Black Logo',
    bgImage: 'https://i.postimg.cc/QxBvTKVK/OVS-Orbit-Camper-Cap-White.jpg',
    images: [
      'https://i.postimg.cc/QxBvTKVK/OVS-Orbit-Camper-Cap-White.jpg'
    ],
    sizes: ['One Size (Adjustable)'],
    inStock: true,
    rating: 4.6
  },
  {
    id: 'ovs-echo-tee-black',
    name: 'OVS Echo Tee — Black',
    price: 350,
    category: 'T-Shirts',
    description: 'The OVS Echo Tee explores identity, emotion, and self-expression through bold visual storytelling. Crafted for comfort and designed to stand out, this statement piece blends contemporary streetwear with artistic influence.',
    features: [
      'Premium heavy-weight 240GSM cotton construction',
      'Relaxed vintage streetwear fit',
      'High-contrast digital graphic print',
      'Soft-touch premium handle feel',
      'Ribbed neckline for structure retention'
    ],
    color: 'Black / White Graphic',
    bgImage: 'https://i.postimg.cc/BQ8RKPt8/OVS-Echo-Tee-Black.jpg',
    images: [
      'https://i.postimg.cc/BQ8RKPt8/OVS-Echo-Tee-Black.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    rating: 4.9
  },
  {
    id: 'ovs-echo-tee-white',
    name: 'OVS Echo Tee — White',
    price: 350,
    category: 'T-Shirts',
    description: 'Clean, expressive, and unapologetically bold. The OVS Echo Tee in White combines minimalist styling with a striking graphic centerpiece. Designed for versatility, it pairs effortlessly with any wardrobe while maintaining a distinctive OVS identity.',
    features: [
      'Premium heavyweight cotton fabric',
      'Relaxed architectural fit',
      'Signature front monochrome graphic',
      'Highly breathable and durable',
      'Designed and crafted in South Africa'
    ],
    color: 'White / Black Graphic',
    bgImage: 'https://i.postimg.cc/TYyBD5h1/OVS-Echo-Tee-White.jpg',
    images: [
      'https://i.postimg.cc/TYyBD5h1/OVS-Echo-Tee-White.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    rating: 4.8
  },
  {
    id: 'ovs-core-beanie-black',
    name: 'OVS Core Beanie — Black',
    price: 200,
    category: 'Beanies',
    description: 'The OVS Core Beanie is a cold-weather essential designed with simplicity at its heart. Featuring the iconic OVS emblem embroidered on the cuff, it offers warmth, comfort, and effortless style for every season.',
    features: [
      'Hypoallergenic soft knit construction',
      'Folded cuff structured design',
      'Embroidered white OVS emblem',
      'Comfortable everyday stretch fit',
      'Minimalist unisex aesthetic'
    ],
    color: 'Black / White Logo',
    bgImage: 'https://i.postimg.cc/28qgZL36/OVS-Core-Beanie-Black.jpg',
    images: [
      'https://i.postimg.cc/28qgZL36/OVS-Core-Beanie-Black.jpg'
    ],
    sizes: ['One Size Fits All'],
    inStock: true,
    rating: 4.7
  },
  {
    id: 'ovs-core-beanie-white',
    name: 'OVS Core Beanie — White',
    price: 200,
    category: 'Beanies',
    description: 'Simple, clean, and versatile. The OVS Core Beanie in White delivers a refined monochrome look while maintaining everyday comfort. Finished with the signature OVS emblem, it’s designed for those who appreciate understated style.',
    features: [
      'Soft premium knit build',
      'Folded ribbed cuff construction',
      'Embroidered black OVS emblem',
      'Comfortable stretch-to-fit structure',
      'Signature OVS monochrome minimalism'
    ],
    color: 'White / Black Logo',
    bgImage: 'https://i.postimg.cc/PfVBJQfp/OVS-Core-Beanie-White.jpg',
    images: [
      'https://i.postimg.cc/PfVBJQfp/OVS-Core-Beanie-White.jpg'
    ],
    sizes: ['One Size Fits All'],
    inStock: true,
    rating: 4.5
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Kabelo M.',
    rating: 5,
    comment: 'The quality of the 240GSM cotton on the Echo Tee is premium. Easily beats international streetwear brands. Proudly South African statement!',
    date: 'May 12, 2026',
    location: 'Braamfontein, JHB'
  },
  {
    id: 'rev-2',
    author: 'Zolani D.',
    rating: 5,
    comment: 'Orbit Camper Cap fits perfectly. The structured panel looks amazing. Drove out of Cape Town CBD with the window down, stayed perfectly fitted. Standard delivery was super fast too.',
    date: 'April 28, 2026',
    location: 'Salt River, CPT'
  },
  {
    id: 'rev-3',
    author: 'Tumi S.',
    rating: 4.8,
    comment: 'In love with the minimalistic aesthetic. Clean monochrome tag, comfortable fabric, heavy drapes. We need more collections soon!',
    date: 'May 20, 2026',
    location: 'Maboneng, JHB'
  }
];

export const FAQS: FAQ[] = [
  {
    question: 'Where is OVS streetwear manufactured?',
    answer: 'Every piece is proudly designed, compiled, and stitched locally in factories across South Africa—primarily in Johannesburg CBD and Salt River, Cape Town. We are committed to ethical production and supporting our local garment craftsmen.'
  },
  {
    question: 'What are your shipping rates and carrier services?',
    answer: 'We offer free courier delivery throughout South Africa on all orders. We ship utilizing premium couriers like DPD Laser and Aramex, with delivery takes 2-4 business days.'
  },
  {
    question: 'How does sizing run on OVS streetwear pieces?',
    answer: 'Our tees and hoodies feature a relaxed, slightly oversized streetwear box cut. If you prefer a conventional fitted look, we recommend sizing down. Detailed size guides with shoulder/chest specs are available on each product page.'
  },
  {
    question: 'What is the OVS exchange and returns policy?',
    answer: 'We want you to wear your outfit with complete confidence. We accept free returns and exchanges within 14 days of receipt, provided the items are in their original condition with tag fasteners intact.'
  }
];
