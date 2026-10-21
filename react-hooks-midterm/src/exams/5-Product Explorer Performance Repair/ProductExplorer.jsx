import { memo, useCallback, useMemo, useState } from 'react';

const GADGET_MODELS = [
  { name: 'iPhone 11', category: 'Phones', price: 299 },
  { name: 'iPhone 12', category: 'Phones', price: 399 },
  { name: 'iPhone 13', category: 'Phones', price: 499 },
  { name: 'iPhone 14', category: 'Phones', price: 599 },
  { name: 'iPhone 15', category: 'Phones', price: 699 },
  { name: 'iPhone 16', category: 'Phones', price: 799 },
  { name: 'iPhone 17', category: 'Phones', price: 899 },
  { name: 'iPhone 18', category: 'Phones', price: 999 },
  { name: 'AirPods (2nd generation)', category: 'Audio', price: 99 },
  { name: 'AirPods (3rd generation)', category: 'Audio', price: 129 },
  { name: 'AirPods (4th generation)', category: 'Audio', price: 179 },
  { name: 'AirPods Pro (2nd generation)', category: 'Audio', price: 249 },
  { name: 'AirPods Max', category: 'Audio', price: 549 }
];

const CATEGORIES = [...new Set(GADGET_MODELS.map((model) => model.category))];

const ALL_PRODUCTS = Array.from({ length: 500 }, (_, index) => {
  const model = GADGET_MODELS[index % GADGET_MODELS.length];
  return {
    id: index + 1,
    name: model.name,
    category: model.category,
    price: model.price + Math.floor(Math.random() * 100)
  };
});

const ProductList = memo(function ProductList({ products, onSelect }) {
  if (import.meta.env.DEV) {
    console.log(`ProductList rendered with ${products.length} products`);
  }

  if (products.length === 0) {
    return <p className="empty-state">No products match these filters.</p>;
  }

  return (
    <ul className="plain-list scroll-list">
      {products.map((product) => (
        <li className="list-row" key={product.id}>
          <div className="product-details">
            <span className="list-primary">{product.name}</span>
            <span className="list-secondary">{product.category} · ${product.price}</span>
          </div>
          <button
            className="button button-secondary"
            onClick={() => onSelect(product)}
          >
            Select
          </button>
        </li>
      ))}
    </ul>
  );
});

export default function ProductExplorer() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('low-to-high');
  const [darkTheme, setDarkTheme] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [counter, setCounter] = useState(0);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = ALL_PRODUCTS.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === 'All' || product.category === category;
      return matchesQuery && matchesCategory;
    });

    return filtered.sort((first, second) => (
      sortOrder === 'low-to-high'
        ? first.price - second.price
        : second.price - first.price
    ));
  }, [query, category, sortOrder]);

  const handleSelectProduct = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  return (
    <section className={`exam-card product-card${darkTheme ? ' product-card-dark' : ''}`}>
      <h2 className="exam-title">Product Explorer</h2>

      <div className="product-controls">
        <label className="field-group">
          <span>Search products</span>
          <input
            className="field"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter a product name"
          />
        </label>

        <label className="field-group">
          <span>Category</span>
          <select
            className="field"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="field-group">
          <span>Sort by price</span>
          <select
            className="field"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="low-to-high">Low to high</option>
            <option value="high-to-low">High to low</option>
          </select>
        </label>
      </div>

      <div className="product-actions">
        <p className="list-secondary" aria-live="polite">
          Showing {visibleProducts.length} of {ALL_PRODUCTS.length} products
        </p>
        <div className="button-row">
          <button
            className="button button-secondary"
            onClick={() => setCounter((previousCount) => previousCount + 1)}
          >
            Unrelated counter: {counter}
          </button>
          <button
            className="button button-secondary"
            onClick={() => setDarkTheme((previousTheme) => !previousTheme)}
          >
            {darkTheme ? 'Use light theme' : 'Use dark theme'}
          </button>
        </div>
      </div>

      {selectedProduct && (
        <div className="notice">
          Selected: <strong>{selectedProduct.name}</strong> (${selectedProduct.price})
        </div>
      )}

      <ProductList products={visibleProducts} onSelect={handleSelectProduct} />
    </section>
  );
}
