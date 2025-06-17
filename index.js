// Product Data
const products = [
  { id: 1, brand: 'apple', name: 'iPhone 13', price: 799, storage: 128 },
  { id: 2, brand: 'samsung', name: 'Galaxy S22', price: 999, storage: 256 },
  { id: 3, brand: 'google', name: 'Pixel 6', price: 599, storage: 128 },
  { id: 4, brand: 'apple', name: 'iPhone SE', price: 429, storage: 64 },
  { id: 5, brand: 'samsung', name: 'Galaxy Z Flip', price: 1299, storage: 512 },
  { id: 6, brand: 'apple', name: 'iPhone 14 Pro', price: 1499, storage: 1024 }
];

/**
 * Applies all filters
 * @returns {boolean} False if validation fails
 */
function applyFilters() {
  const brand = document.getElementById('brand').value;
  const priceRange = document.getElementById('price-range').value;
  const storageInput = document.getElementById('storage');
  const storageError = document.getElementById('storage-error');
  const storage = parseInt(storageInput.value);

  // Validate storage input
  if (storageInput.value) {
    if (storage < 64 || storage > 1024) {
      storageError.classList.remove('hidden');
      return false;
    }
  }
  storageError.classList.add('hidden');

  // Filter logic
  let filtered = [...products];

  if (brand) {
    filtered = filtered.filter(p => p.brand === brand);
  }

  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  if (storage) {
    filtered = filtered.filter(p => p.storage === storage);
  }

  renderProducts(filtered);
  return true;
}

/**
 * Renders products to the DOM
 * @param {Array} products - Products to display
 */
function renderProducts(products) {
  const productsContainer = document.getElementById('products');
  const productsCount = document.getElementById('products-count');

  // Update products count
  productsCount.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
  
  if (products.length === 0) {
    productsContainer.innerHTML = '<div class="no-results">No products match your filters. Try adjusting your criteria.</div>';
    return;
  }

  let html = '';
  products.forEach(product => {
    const brandClass = `brand-${product.brand}`;
    html += `
      <div class="product-card" data-id="${product.id}">
        <div class="product-header">
          <h3>${product.name}</h3>
          <span class="brand-badge ${brandClass}">${product.brand}</span>
        </div>
        <div class="product-details">
          <div class="product-detail">
            <span class="detail-label">💰 Price</span>
            <span class="detail-value price">$${product.price.toFixed(2)}</span>
          </div>
          <div class="product-detail">
            <span class="detail-label">💾 Storage</span>
            <span class="detail-value storage-value">${product.storage}GB</span>
          </div>
        </div>
      </div>
    `;
  });
  productsContainer.innerHTML = html;
}

// Export functions for testing
export { applyFilters, renderProducts }; 