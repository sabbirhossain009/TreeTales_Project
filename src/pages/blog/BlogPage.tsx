import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  TrendingUp,
  BookOpen,
  Leaf,
  Sun,
  Droplets
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  views: number;
}

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Complete Guide to Indoor Plant Care for Beginners',
      excerpt: 'Learn the essential tips and tricks for keeping your indoor plants healthy and thriving. Perfect for those just starting their plant journey in Bangladesh.',
      content: '',
      author: 'Dr. Fatima Rahman',
      authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Plant Care',
      tags: ['beginner', 'indoor plants', 'care tips'],
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      views: 1250
    },
    {
      id: '2',
      title: 'Best Plants for Rooftop Gardens in Bangladesh Climate',
      excerpt: 'Discover which plants thrive in Bangladesh\'s tropical climate and are perfect for rooftop gardening. Includes care instructions and seasonal planting tips.',
      content: '',
      author: 'Ahmed Hassan',
      authorAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'Rooftop Gardening',
      tags: ['rooftop', 'bangladesh', 'climate'],
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      views: 980
    },
    {
      id: '3',
      title: 'How to Propagate Plants: A Step-by-Step Guide',
      excerpt: 'Master the art of plant propagation with our detailed guide. Learn different methods and increase your plant collection for free.',
      content: '',
      author: 'Maya Patel',
      authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-10',
      readTime: '10 min read',
      category: 'Plant Care',
      tags: ['propagation', 'cuttings', 'growing'],
      image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      views: 756
    },
    {
      id: '4',
      title: 'Creating a Sustainable Urban Garden',
      excerpt: 'Learn how to create an eco-friendly urban garden that benefits both you and the environment. Tips for composting, water conservation, and more.',
      content: '',
      author: 'Rashid Ahmed',
      authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-08',
      readTime: '7 min read',
      category: 'Sustainability',
      tags: ['sustainability', 'urban', 'eco-friendly'],
      image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      views: 642
    },
    {
      id: '5',
      title: 'Common Plant Diseases and How to Treat Them',
      excerpt: 'Identify and treat common plant diseases before they spread. Learn prevention techniques and natural treatment methods.',
      content: '',
      author: 'Dr. Fatima Rahman',
      authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-05',
      readTime: '9 min read',
      category: 'Plant Health',
      tags: ['diseases', 'treatment', 'plant health'],
      image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      views: 523
    },
    {
      id: '6',
      title: 'Seasonal Gardening Calendar for Bangladesh',
      excerpt: 'Plan your gardening activities throughout the year with our comprehensive seasonal calendar tailored for Bangladesh\'s climate.',
      content: '',
      author: 'Karim Hassan',
      authorAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-03',
      readTime: '5 min read',
      category: 'Seasonal Tips',
      tags: ['seasonal', 'calendar', 'planning'],
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      views: 445
    },
    {
      id: '7',
      title: 'Urban Composting: Turn Kitchen Waste into Plant Gold',
      excerpt: 'Learn how to create nutrient-rich compost from kitchen scraps in small urban spaces. Perfect for apartment dwellers and rooftop gardeners.',
      content: '',
      author: 'Dr. Fatima Rahman',
      authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-01',
      readTime: '6 min read',
      category: 'Sustainability',
      tags: ['composting', 'urban', 'waste-management'],
      image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      views: 387
    },
    {
      id: '8',
      title: 'Monstera Care: From Cutting to Climbing Giant',
      excerpt: 'Everything you need to know about growing and caring for Monstera plants. From propagation to providing proper support for climbing.',
      content: '',
      author: 'Maya Patel',
      authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2023-12-28',
      readTime: '8 min read',
      category: 'Plant Care',
      tags: ['monstera', 'climbing-plants', 'propagation'],
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      views: 892
    },
    {
      id: '9',
      title: 'Water-Wise Gardening in Bangladesh\'s Dry Season',
      excerpt: 'Strategies for maintaining a thriving garden during Bangladesh\'s dry months. Learn about drought-resistant plants and water conservation techniques.',
      content: '',
      author: 'Rashid Ahmed',
      authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2023-12-25',
      readTime: '7 min read',
      category: 'Seasonal Tips',
      tags: ['drought-resistant', 'water-conservation', 'dry-season'],
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      views: 634
    },
    {
      id: '10',
      title: 'Building a Vertical Garden: Maximize Your Space',
      excerpt: 'Create stunning vertical gardens perfect for small rooftops and balconies. Learn about plant selection, irrigation, and structural considerations.',
      content: '',
      author: 'Ahmed Hassan',
      authorAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2023-12-22',
      readTime: '10 min read',
      category: 'Rooftop Gardening',
      tags: ['vertical-garden', 'space-saving', 'small-spaces'],
      image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      views: 567
    }
  ];

  const categories = ['all', 'Plant Care', 'Rooftop Gardening', 'Plant Health', 'Sustainability', 'Seasonal Tips'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const popularTags = ['beginner', 'indoor plants', 'rooftop', 'care tips', 'propagation', 'sustainability'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-100 p-4 rounded-full">
              <BookOpen className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gardening Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert tips, guides, and insights to help you grow a thriving garden
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, tags..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
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
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {selectedCategory === 'all' && searchQuery === '' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
                  Featured Articles
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-emerald-600 text-white px-2 py-1 text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-sm text-gray-600">{post.author}</span>
                          </div>
                          <span className="text-sm text-gray-500">{post.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {searchQuery || selectedCategory !== 'all' ? 'Search Results' : 'Latest Articles'}
              </h2>
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 flex space-x-6"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-32 h-24 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{post.views} views</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-600">{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or browse our featured articles.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Tags */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="h-5 w-5 text-emerald-600 mr-2" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Sun className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Light Requirements</h4>
                    <p className="text-xs text-gray-600">Most houseplants prefer bright, indirect light</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Droplets className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Watering Tips</h4>
                    <p className="text-xs text-gray-600">Check soil moisture before watering</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Plant Health</h4>
                    <p className="text-xs text-gray-600">Yellow leaves often indicate overwatering</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-emerald-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest gardening tips and plant care advice delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;