import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  MapPin,
  Sun,
  Droplets,
  Leaf,
  Thermometer,
  Clock,
  Shield,
  Truck,
  MessageCircle,
  Plus,
  Minus
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  seller: string;
  location: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  lightRequirement: 'Low' | 'Medium' | 'High';
  waterFrequency: string;
  temperature: string;
  humidity: string;
  description: string;
  careInstructions: string[];
  benefits: string[];
  inStock: boolean;
  stockCount: number;
  featured: boolean;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Mock product data - in real app, fetch from API
    const mockProduct: Product = {
      id: id || '1',
      name: 'Monstera Deliciosa',
      price: 1200,
      originalPrice: 1500,
      images: [
        'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      rating: 4.8,
      reviews: 124,
      seller: 'Green Paradise',
      location: 'Dhaka',
      category: 'Indoor Plants',
      difficulty: 'Easy',
      lightRequirement: 'Medium',
      waterFrequency: 'Weekly',
      temperature: '18-24°C',
      humidity: '40-60%',
      description: 'The Monstera Deliciosa, also known as the Swiss Cheese Plant, is a stunning tropical plant that makes a perfect statement piece for any home. With its iconic split leaves and easy-care nature, it\'s ideal for both beginners and experienced plant parents.',
      careInstructions: [
        'Place in bright, indirect light',
        'Water when top inch of soil is dry',
        'Provide support for climbing',
        'Wipe leaves regularly to remove dust',
        'Fertilize monthly during growing season'
      ],
      benefits: [
        'Air purifying qualities',
        'Low maintenance requirements',
        'Fast growing and dramatic',
        'Perfect for Instagram-worthy photos',
        'Suitable for beginners'
      ],
      inStock: true,
      stockCount: 15,
      featured: true
    };
    setProduct(mockProduct);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          sellerId: product.seller,
          sellerName: product.seller
        });
      }
    }
  };

  const reviews = [
    {
      id: 1,
      user: 'Sarah Ahmed',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      date: '2024-01-15',
      comment: 'Beautiful plant! Arrived in perfect condition and the seller provided excellent care instructions.'
    },
    {
      id: 2,
      user: 'Karim Hassan',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great quality plant. Growing well in my living room. Highly recommend this seller!'
    }
  ];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/products" className="flex items-center space-x-1 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Plants</span>
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden shadow-sm border-2 transition-colors ${
                    selectedImage === index ? 'border-emerald-600' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                    <Heart className="h-6 w-6" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{product.seller}, {product.location}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">৳{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                  Save ৳{product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Plant Care Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Sun className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Light</p>
                  <p className="text-sm text-gray-600">{product.lightRequirement}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Water</p>
                  <p className="text-sm text-gray-600">{product.waterFrequency}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Difficulty</p>
                  <p className="text-sm text-gray-600">{product.difficulty}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Temperature</p>
                  <p className="text-sm text-gray-600">{product.temperature}</p>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stockCount} available
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border border-emerald-600 text-emerald-600 py-3 px-6 rounded-lg hover:bg-emerald-50 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Seller</span>
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="text-sm text-gray-600">Quality Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <span className="text-sm text-gray-600">7-Day Return</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'care', label: 'Care Instructions' },
                { id: 'reviews', label: `Reviews (${product.reviews})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits:</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'care' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Instructions:</h3>
                <div className="space-y-3">
                  {product.careInstructions.map((instruction, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{review.user}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;