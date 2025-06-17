import { TextEncoder, TextDecoder } from 'util';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyFilters, renderProducts } from '../index.js';

// Add polyfills
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Setup DOM environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const dom = new JSDOM(html);
global.document = dom.window.document;
global.window = dom.window;

describe('E-commerce Filter System Tests', () => {
  let brandFilter;
  let priceFilter;
  let storageInput;
  let storageError;
  let applyBtn;
  let productsContainer;
  let productsCount;

  beforeEach(() => {
    // Reset DOM elements before each test
    document.body.innerHTML = html;
    brandFilter = document.getElementById('brand');
    priceFilter = document.getElementById('price-range');
    storageInput = document.getElementById('storage');
    storageError = document.getElementById('storage-error');
    applyBtn = document.getElementById('apply-filters');
    productsContainer = document.getElementById('products');
    productsCount = document.getElementById('products-count');
  });

  // Black Box Testing - Boundary Value Analysis for Storage Input
  describe('Storage Input Boundary Value Analysis', () => {
    test.each([
      { value: 63, expected: false, description: 'Below minimum boundary' },
      { value: 64, expected: true, description: 'Minimum boundary' },
      { value: 65, expected: true, description: 'Just above minimum boundary' },
      { value: 1023, expected: true, description: 'Just below maximum boundary' },
      { value: 1024, expected: true, description: 'Maximum boundary' },
      { value: 1025, expected: false, description: 'Above maximum boundary' }
    ])('Storage value $value should be $expected ($description)', ({ value, expected }) => {
      storageInput.value = value;
      expect(applyFilters()).toBe(expected);
    });
  });

  // Black Box Testing - Equivalence Partitioning
  describe('Equivalence Partitioning Tests', () => {
    // Valid Input Partitions
    test('Valid brand selection should filter products', () => {
      brandFilter.value = 'apple';
      applyFilters();
      const appleProducts = productsContainer.querySelectorAll('.product-card');
      expect(appleProducts.length).toBe(3); // Should show 3 Apple products
    });

    test('Valid price range should filter products', () => {
      priceFilter.value = '500-1000';
      applyFilters();
      const filteredProducts = productsContainer.querySelectorAll('.product-card');
      expect(filteredProducts.length).toBeGreaterThan(0);
    });

    test('Valid storage value should filter products', () => {
      storageInput.value = '128';
      applyFilters();
      const filteredProducts = productsContainer.querySelectorAll('.product-card');
      expect(filteredProducts.length).toBeGreaterThan(0);
    });

    // Invalid Input Partitions
    test('Invalid storage value should show error', () => {
      storageInput.value = '50'; // Using a value below the minimum (64)
      const result = applyFilters();
      expect(result).toBe(false); // Should return false for invalid input
      expect(storageError.classList.contains('hidden')).toBe(false); // Error should be visible for invalid input
    });

    test('Empty filters should show all products', () => {
      applyFilters();
      const allProducts = productsContainer.querySelectorAll('.product-card');
      expect(allProducts.length).toBe(6); // Total number of products
    });
  });

  // White Box Testing - Statement Coverage
  describe('Statement Coverage Tests', () => {
    test('renderProducts should handle empty product list', () => {
      renderProducts([]);
      expect(productsContainer.innerHTML).toContain('No products match your filters');
    });

    test('renderProducts should display correct product count', () => {
      renderProducts([{ id: 1, brand: 'apple', name: 'iPhone', price: 999, storage: 128 }]);
      expect(productsCount.textContent).toBe('1 product');
    });

    test('renderProducts should display multiple products', () => {
      const testProducts = [
        { id: 1, brand: 'apple', name: 'iPhone', price: 999, storage: 128 },
        { id: 2, brand: 'samsung', name: 'Galaxy', price: 899, storage: 256 }
      ];
      renderProducts(testProducts);
      expect(productsCount.textContent).toBe('2 products');
    });
  });

  // Decision Coverage Tests
  describe('Decision Coverage Tests', () => {
    test('Filter combinations should work correctly', () => {
      // Test case 1: Brand only
      brandFilter.value = 'apple';
      priceFilter.value = '';
      storageInput.value = '';
      applyFilters();
      expect(productsContainer.querySelectorAll('.product-card').length).toBe(3);

      // Test case 2: Price range only
      brandFilter.value = '';
      priceFilter.value = '500-1000';
      storageInput.value = '';
      applyFilters();
      expect(productsContainer.querySelectorAll('.product-card').length).toBeGreaterThan(0);

      // Test case 3: Storage only
      brandFilter.value = '';
      priceFilter.value = '';
      storageInput.value = '128';
      applyFilters();
      expect(productsContainer.querySelectorAll('.product-card').length).toBeGreaterThan(0);

      // Test case 4: All filters
      brandFilter.value = 'apple';
      priceFilter.value = '500-1000';
      storageInput.value = '128';
      applyFilters();
      expect(productsContainer.querySelectorAll('.product-card').length).toBeGreaterThan(0);
    });
  });

  // Decision Table Tests
  describe('Decision Table Tests', () => {
    test.each([
      {
        brand: 'apple',
        priceRange: '500-1000',
        storage: '128',
        expectedCount: 1,
        description: 'Apple phone in $500-1000 range with 128GB storage'
      },
      {
        brand: 'samsung',
        priceRange: '1000-1500',
        storage: '512',
        expectedCount: 1,
        description: 'Samsung phone in $1000-1500 range with 512GB storage'
      },
      {
        brand: 'google',
        priceRange: '0-500',
        storage: '128',
        expectedCount: 0,
        description: 'Google phone in $0-500 range with 128GB storage'
      },
      {
        brand: '',
        priceRange: '',
        storage: '',
        expectedCount: 6,
        description: 'No filters applied'
      }
    ])('Filter combination: $description', ({ brand, priceRange, storage, expectedCount }) => {
      brandFilter.value = brand;
      priceFilter.value = priceRange;
      storageInput.value = storage;
      applyFilters();
      expect(productsContainer.querySelectorAll('.product-card').length).toBe(expectedCount);
    });
  });
});
