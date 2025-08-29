import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Heart, 
  BookOpen,
  Tag,
  Eye,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock blog post data - in real app, fetch from API
  const post = {
    id: id || '1',
    title: 'Complete Guide to Indoor Plant Care for Beginners',
    content: `
      <p>Starting your journey with indoor plants can be both exciting and overwhelming. With so many varieties to choose from and care instructions to follow, it's easy to feel lost. This comprehensive guide will walk you through everything you need to know to become a successful indoor plant parent.</p>

      <h2>Understanding Light Requirements</h2>
      <p>Light is one of the most crucial factors for plant health. Most indoor plants fall into three categories:</p>
      <ul>
        <li><strong>Low Light Plants:</strong> Snake plants, ZZ plants, and pothos can thrive in dimmer conditions</li>
        <li><strong>Medium Light Plants:</strong> Monstera, rubber plants, and peace lilies prefer bright, indirect light</li>
        <li><strong>High Light Plants:</strong> Succulents, cacti, and fiddle leaf figs need direct sunlight</li>
      </ul>

      <h2>Watering Wisdom</h2>
      <p>Overwatering is the number one killer of houseplants. Here's how to get it right:</p>
      <ul>
        <li>Check the soil moisture by inserting your finger 1-2 inches deep</li>
        <li>Water thoroughly until water drains from the bottom</li>
        <li>Empty saucers after 30 minutes to prevent root rot</li>
        <li>Most plants prefer to dry out slightly between waterings</li>
      </ul>

      <h2>Humidity and Temperature</h2>
      <p>Most tropical houseplants prefer humidity levels between 40-60%. You can increase humidity by:</p>
      <ul>
        <li>Using a humidifier</li>
        <li>Placing plants on pebble trays filled with water</li>
        <li>Grouping plants together</li>
        <li>Misting (though this is less effective than other methods)</li>
      </ul>

      <h2>Fertilizing Your Plants</h2>
      <p>During the growing season (spring and summer), most houseplants benefit from monthly fertilizing. Use a balanced, water-soluble fertilizer diluted to half strength. Reduce or stop fertilizing in fall and winter when plant growth slows.</p>

      <h2>Common Problems and Solutions</h2>
      <p>Even experienced plant parents encounter issues. Here are some common problems:</p>
      <ul>
        <li><strong>Yellow leaves:</strong> Usually indicates overwatering or natural aging</li>
        <li><strong>Brown leaf tips:</strong> Often caused by low humidity or fluoride in tap water</li>
        <li><strong>Dropping leaves:</strong> Can be stress from changes in environment or watering</li>
        <li><strong>Pests:</strong> Spider mites, aphids, and mealybugs can be treated with insecticidal soap</li>
      </ul>

      <h2>Best Beginner Plants</h2>
      <p>If you're just starting out, these plants are forgiving and easy to care for:</p>
      <ul>
        <li><strong>Snake Plant (Sansevieria):</strong> Tolerates neglect and low light</li>
        <li><strong>Pothos:</strong> Fast-growing and adaptable to various conditions</li>
        <li><strong>ZZ Plant:</strong> Extremely drought-tolerant and low-maintenance</li>
        <li><strong>Spider Plant:</strong> Easy to propagate and very resilient</li>
        <li><strong>Rubber Plant:</strong> Attractive and relatively easy to care for</li>
      </ul>

      <h2>Creating the Right Environment</h2>
      <p>Success with indoor plants isn't just about individual care—it's about creating the right environment:</p>
      <ul>
        <li>Choose the right pot size (not too big, not too small)</li>
        <li>Ensure proper drainage holes</li>
        <li>Use quality potting soil, not garden soil</li>
        <li>Rotate plants regularly for even growth</li>
        <li>Keep plants away from heating vents and drafts</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Remember, becoming a successful plant parent takes time and practice. Don't be discouraged if you lose a plant or two along the way—it's all part of the learning process. Start with easy plants, observe them closely, and gradually expand your collection as you gain confidence and experience.</p>

      <p>The key to success is consistency, observation, and patience. Your plants will reward your care with beautiful growth and improved air quality in your home. Happy gardening!</p>
    `,
    author: 'Dr. Fatima Rahman',
    authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    authorBio: 'Dr. Fatima Rahman is a botanist and plant care expert with over 15 years of experience. She specializes in indoor plant care and sustainable gardening practices.',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Plant Care',
    tags: ['beginner', 'indoor plants', 'care tips', 'houseplants'],
    image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: 1250,
    likes: 89,
    comments: 23
  };

  const relatedPosts = [
    {
      id: '2',
      title: 'Best Plants for Rooftop Gardens in Bangladesh',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Rooftop Gardening',
      readTime: '6 min read'
    },
    {
      id: '3',
      title: 'How to Propagate Plants: A Step-by-Step Guide',
      image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Plant Care',
      readTime: '10 min read'
    },
    {
      id: '5',
      title: 'Common Plant Diseases and How to Treat Them',
      image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Plant Health',
      readTime: '9 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/blog" className="flex items-center space-x-1 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
          <span>/</span>
          <span>{post.category}</span>
          <span>/</span>
          <span className="text-gray-900 truncate">{post.title}</span>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          
          <div className="p-8">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Eye className="h-4 w-4" />
                <span>{post.views} views</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{post.author}</h3>
                  <p className="text-sm text-gray-600">{post.authorBio}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-emerald prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-900">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-emerald-100 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                    <ThumbsUp className="h-5 w-5" />
                    <span>{post.likes} likes</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments} comments</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 text-emerald-600 mr-2" />
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                      {relatedPost.category}
                    </span>
                    <span className="text-xs text-gray-600">{relatedPost.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-emerald-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest gardening tips, plant care advice, and exclusive content delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;