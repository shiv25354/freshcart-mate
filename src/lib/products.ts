
import { Product } from './types';
import { standardWeightOptions } from './weightOptions';

export const products: Product[] = [
  {
    id: "p1",
    name: "Organic Avocado",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "fruits",
    description: "Fresh organic avocados with rich flavor and creamy texture. Perfect for guacamole, salads, or enjoying on toast.",
    inStock: true,
    rating: 4.8,
    isFeatured: true,
    weightOptions: standardWeightOptions
  },
  {
    id: "p2",
    name: "Fresh Strawberries",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "fruits",
    description: "Sweet and juicy strawberries, picked at peak ripeness. Enjoy as a snack or use in smoothies and desserts.",
    inStock: true,
    rating: 4.5,
    discount: 15,
    weightOptions: standardWeightOptions
  },
  {
    id: "p3",
    name: "Organic Spinach",
    price: 2.29,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "vegetables",
    description: "Nutrient-rich organic spinach leaves. A versatile leafy green that's perfect for salads, smoothies, or cooking.",
    inStock: true,
    rating: 4.3,
    weightOptions: standardWeightOptions
  },
  {
    id: "p4",
    name: "Free-Range Eggs",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=3160&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "dairy",
    description: "Farm-fresh eggs from free-range chickens. Higher in nutrients with rich, flavorful yolks.",
    inStock: true,
    rating: 4.9,
    isFeatured: true,
    weightOptions: standardWeightOptions
  },
  {
    id: "p5",
    name: "Artisan Sourdough",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1585478259715-32fa5ea6108f?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "bakery",
    description: "Handcrafted sourdough bread made with our signature starter. Crusty exterior with a soft, tangy interior.",
    inStock: true,
    rating: 4.7,
    isNew: true,
    weightOptions: standardWeightOptions
  },
  {
    id: "p6",
    name: "Organic Whole Milk",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=2625&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "dairy",
    description: "Creamy organic whole milk from grass-fed cows. Non-homogenized with a rich, natural flavor.",
    inStock: true,
    rating: 4.6,
    weightOptions: standardWeightOptions
  },
  {
    id: "p7",
    name: "Atlantic Salmon Fillet",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c9b3b9f8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "meat",
    description: "Fresh Atlantic salmon fillets, sustainably sourced. Rich in omega-3 fatty acids with a delicate flavor.",
    inStock: true,
    rating: 4.8,
    discount: 10,
    weightOptions: standardWeightOptions
  },
  {
    id: "p8",
    name: "Cold Brew Coffee",
    price: 4.29,
    image: "https://images.unsplash.com/photo-1592663527359-cf6642f54e65?q=80&w=2949&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "beverages",
    description: "Smooth, low-acid cold brew coffee made from organic beans. Less bitter with a naturally sweet finish.",
    inStock: true,
    rating: 4.5,
    isFeatured: true,
    weightOptions: standardWeightOptions
  },
  {
    id: "p9",
    name: "Bell Peppers Mix",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "vegetables",
    description: "Colorful mix of red, yellow, and green bell peppers. Sweet, crunchy, and perfect for salads, stir-fries, or roasting.",
    inStock: true,
    rating: 4.4,
    weightOptions: standardWeightOptions
  },
  {
    id: "p10",
    name: "Blueberry Smoothie",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "beverages",
    description: "Refreshing blueberry smoothie made with organic berries and yogurt. No added sugars or preservatives.",
    inStock: true,
    rating: 4.7,
    isNew: true,
    weightOptions: standardWeightOptions
  },
  {
    id: "p11",
    name: "Organic Bananas",
    price: 1.49,
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2830&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "fruits",
    description: "Sweet and nutritious organic bananas. Perfect as a quick snack or for baking and smoothies.",
    inStock: true,
    rating: 4.3,
    weightOptions: standardWeightOptions
  },
  {
    id: "p12",
    name: "Fresh Basil",
    price: 2.79,
    image: "https://images.unsplash.com/photo-1600692990702-609c1a3fafb8?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "vegetables",
    description: "Aromatic fresh basil leaves. Essential for Italian cuisine, perfect for pasta, pizza, and salads.",
    inStock: true,
    rating: 4.6,
    weightOptions: standardWeightOptions
  }
];

// Update each product to include weightOptions if not already defined
products.forEach(product => {
  if (!product.weightOptions) {
    product.weightOptions = standardWeightOptions;
  }
});

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getDiscountedProducts = (): Product[] => {
  return products.filter(product => product.discount);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
