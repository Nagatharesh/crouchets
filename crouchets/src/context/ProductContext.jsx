import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const DEFAULT_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Classic Cherry Keychain',
    description: 'A sweet pair of ruby red cherries. Handmade with soft acrylic yarn.',
    price: 350,
    category: 'Keychain',
    variants: ['Red', 'Dark Red'],
    stock: 12,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1590005354167-6da97ce231ce?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 'prod_2',
    name: 'Matcha Frog Charm',
    description: 'Your tiny green companion for everyday adventures.',
    price: 450,
    category: 'Bag Charm',
    variants: ['Matcha Green'],
    stock: 5,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1598502390979-99ffc71b694b?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 'prod_3',
    name: 'Strawberry Milk Cow',
    description: 'A cute miniature cow inspired by strawberry milk.',
    price: 550,
    category: 'Keychain',
    variants: ['Pink'],
    stock: 0,
    inStock: false,
    image: 'https://images.unsplash.com/photo-1618642784732-f15f037be6c3?auto=format&fit=crop&q=80&w=400&h=400',
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('crouchets_products');
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (e) {
        setProducts(DEFAULT_PRODUCTS);
      }
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem('crouchets_products', JSON.stringify(DEFAULT_PRODUCTS));
    }
    setLoading(false);
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('crouchets_products', JSON.stringify(newProducts));
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: `prod_${Date.now()}` };
    saveProducts([newProduct, ...products]);
  };

  const updateProduct = (id, updates) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
    saveProducts(updated);
  };

  const toggleAvailability = (id) => {
    const updated = products.map(p => 
      p.id === id ? { ...p, inStock: !p.inStock, stock: p.inStock ? 0 : (p.stock > 0 ? p.stock : 1) } : p
    );
    saveProducts(updated);
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, toggleAvailability, loading }}>
      {!loading && children}
    </ProductContext.Provider>
  );
};
