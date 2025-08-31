import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingCart,
  MapPin,
  Leaf,
  Sun,
  Droplets,
  Thermometer
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  seller: string;
  location: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  lightRequirement: 'Low' | 'Medium' | 'High';
  waterFrequency: string;
  description: string;
  inStock: boolean;
  featured: boolean;
}

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock products data
  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll use mock data that matches our seeded database
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Monstera Deliciosa',
        price: 1200,
        originalPrice: 1500,
        image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8,
        reviews: 124,
        seller: 'Green Paradise',
        location: 'Dhaka',
        category: 'Indoor Plants',
        difficulty: 'Easy',
        lightRequirement: 'Medium',
        waterFrequency: 'Weekly',
        description: 'Beautiful split-leaf philodendron perfect for indoor decoration',
        inStock: true,
        featured: true
      },
      {
        id: '2',
        name: 'Snake Plant',
        price: 800,
        image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        reviews: 89,
        seller: 'Plant Haven',
        location: 'Chittagong',
        category: 'Indoor Plants',
        difficulty: 'Easy',
        lightRequirement: 'Low',
        waterFrequency: 'Bi-weekly',
        description: 'Low-maintenance air-purifying plant ideal for beginners',
        inStock: true,
        featured: true
      },
      {
        id: '3',
        name: 'Peace Lily',
        price: 600,
        image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.6,
        reviews: 67,
        seller: 'Urban Garden',
        location: 'Sylhet',
        category: 'Flowering Plants',
        difficulty: 'Medium',
        lightRequirement: 'Medium',
        waterFrequency: 'Twice weekly',
        description: 'Elegant flowering plant that thrives in indirect light',
        inStock: true,
        featured: false
      },
      {
        id: '4',
        name: 'Fiddle Leaf Fig',
        price: 2500,
        image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.4,
        reviews: 45,
        seller: 'Botanical Dreams',
        location: 'Dhaka',
        category: 'Indoor Plants',
        difficulty: 'Hard',
        lightRequirement: 'High',
        waterFrequency: 'Weekly',
        description: 'Statement plant with large, glossy leaves',
        inStock: true,
        featured: false
      },
      {
        id: '5',
        name: 'Rubber Plant',
        price: 900,
        image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.7,
        reviews: 92,
        seller: 'Green Thumb',
        location: 'Rajshahi',
        category: 'Indoor Plants',
        difficulty: 'Easy',
        lightRequirement: 'Medium',
        waterFrequency: 'Weekly',
        description: 'Hardy plant with glossy, dark green leaves',
        inStock: false,
        featured: false
      },
      {
        id: '6', 
        name: 'Pothos',
        price: 400,
        image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        reviews: 156,
        seller: 'Plant Paradise',
        location: 'Khulna',
        category: 'Hanging Plants',
        difficulty: 'Easy',
        lightRequirement: 'Low',
        waterFrequency: 'Weekly',
        description: 'Fast-growing trailing plant perfect for hanging baskets',
        inStock: true,
        featured: true
      },
      {
        id: '7',
        name: 'ZZ Plant (Zamioculcas Zamiifolia)',
        price: 750,
        image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8,
        reviews: 78,
        seller: 'Green Paradise',
        location: 'Dhaka',
        category: 'Indoor Plants',
        difficulty: 'Easy',
        lightRequirement: 'Low',
        waterFrequency: 'Monthly',
        description: 'Virtually indestructible plant perfect for low-light spaces',
        inStock: true,
        featured: false
      },
      {
        id: '8',
        name: 'Spider Plant',
        price: 350,
        image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.7,
        reviews: 134,
        seller: 'Plant Haven',
        location: 'Chittagong',
        category: 'Hanging Plants',
        difficulty: 'Easy',
        lightRequirement: 'Medium',
        waterFrequency: 'Twice weekly',
        description: 'Classic houseplant that produces baby plants for easy propagation',
        inStock: true,
        featured: false
      },
      {
        id: '9',
        name: 'Aloe Vera',
        price: 450,
        image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.6,
        reviews: 98,
        seller: 'Urban Garden',
        location: 'Khulna',
        category: 'Succulents',
        difficulty: 'Easy',
        lightRequirement: 'High',
        waterFrequency: 'Bi-weekly',
        description: 'Medicinal succulent with healing properties, perfect for sunny spots',
        inStock: true,
        featured: false
      },
      {
        id: '10',
        name: 'Boston Fern',
        price: 550,
        image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.3,
        reviews: 56,
        seller: 'Green Paradise',
        location: 'Dhaka',
        category: 'Hanging Plants',
        difficulty: 'Medium',
        lightRequirement: 'Medium',
        waterFrequency: 'Twice weekly',
        description: 'Lush, feathery plant that adds tropical feel to any space',
        inStock: true,
        featured: false
      },
      {
        id: '11',
        name: 'Jade Plant',
        price: 320,
        image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.5,
        reviews: 73,
        seller: 'Plant Haven',
        location: 'Chittagong',
        category: 'Succulents',
        difficulty: 'Easy',
        lightRequirement: 'High',
        waterFrequency: 'Bi-weekly',
        description: 'Symbol of good luck and prosperity with thick, glossy leaves',
        inStock: true,
        featured: false
      },
      {
        id: '12',
        name: 'Bird of Paradise',
        price: 1800,
        originalPrice: 2200,
        image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.5,
        reviews: 34,
        seller: 'Botanical Dreams',
        location: 'Dhaka',
        category: 'Indoor Plants',
        difficulty: 'Medium',
        lightRequirement: 'High',
        waterFrequency: 'Weekly',
        description: 'Stunning tropical plant that can produce exotic orange and blue flowers',
        inStock: true,
        featured: true
      }
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(product => product.difficulty === selectedDifficulty);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedDifficulty, priceRange, sortBy]);

  const categories = ['all', 'Indoor Plants', 'Outdoor Plants', 'Flowering Plants', 'Hanging Plants', 'Succulents'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sellerId: product.seller,
      sellerName: product.seller
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Plant Marketplace</h1>
          <p className="text-gray-600">
            Discover beautiful plants from verified sellers across Bangladesh
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plants, categories, sellers..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty === 'all' ? 'All Levels' : difficulty}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedDifficulty('all');
                      setPriceRange([0, 5000]);
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} plants
          </p>
        </div>

        {/* Products Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.featured && (
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white px-2 py-1 text-xs font-medium rounded-full">
                    Featured
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors"
                  >
                    {product.name}
                  </Link>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Sun className="h-3 w-3" />
                    <span>{product.lightRequirement}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Droplets className="h-3 w-3" />
                    <span>{product.waterFrequency}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Leaf className="h-3 w-3" />
                    <span>{product.difficulty}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{product.seller}, {product.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">৳{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">৳{product.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse our featured plants
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setPriceRange([0, 5000]);
              }}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;