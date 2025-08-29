import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Leaf, 
  Users, 
  Award, 
  Truck,
  ShoppingBag,
  Heart,
  BookOpen,
  Star,
  CheckCircle,
  Play
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8 text-emerald-600" />,
      title: "Plant Marketplace",
      description: "Browse and buy plants from verified sellers with detailed care instructions."
    },
    {
      icon: <Heart className="h-8 w-8 text-emerald-600" />,
      title: "Plant Donations",
      description: "Share plants with your community or receive free plants from generous donors."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-emerald-600" />,
      title: "Expert Guidance",
      description: "Access gardening tips, care guides, and educational content from experts."
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: "Community Network",
      description: "Connect with fellow gardeners, share experiences, and grow together."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Gardeners" },
    { number: "5,000+", label: "Plants Available" },
    { number: "500+", label: "Verified Sellers" },
    { number: "50+", label: "Plant Varieties" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Urban Gardener",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "Tree Tales transformed my rooftop into a beautiful garden. The plant quality is excellent and the community support is amazing!",
      rating: 5
    },
    {
      name: "Ahmed Rahman",
      role: "Plant Seller",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "As a seller, Tree Tales has helped me reach customers who truly care about plants. The platform is user-friendly and secure.",
      rating: 5
    },
    {
      name: "Maya Patel",
      role: "Beginner Gardener",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "I started with zero gardening knowledge. The educational resources and community support helped me create my dream garden.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Grow Your
                  <span className="text-emerald-600 block">Rooftop Garden</span>
                  with Tree Tales
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Connect with plant lovers, buy from verified sellers, share through donations, 
                  and learn from experts. Join Bangladesh's largest rooftop gardening community.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products"
                  className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all duration-300 font-semibold text-center group"
                >
                  Browse Plants
                  <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/signup"
                  className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-600 hover:text-white transition-all duration-300 font-semibold text-center"
                >
                  Join Community
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://images.pexels.com/photos/${774909 + i * 100}/pexels-photo-${774909 + i * 100}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                      alt={`User ${i}`}
                      className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">10,000+ gardeners</p>
                  <p className="text-sm text-gray-600">Growing together</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Rooftop Garden"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold text-sm">Verified Plants</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-sm">Free Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-emerald-50 rounded-2xl p-6 group-hover:bg-emerald-100 transition-colors">
                  <h3 className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Urban Gardening
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From buying plants to sharing knowledge, Tree Tales provides all the tools 
              and community support you need for successful rooftop gardening.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How Tree Tales Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started with your rooftop garden is simple and straightforward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Account",
                description: "Sign up as a buyer, seller, or donor to join our gardening community"
              },
              {
                step: "02",
                title: "Browse & Buy",
                description: "Explore our marketplace of verified plants with detailed care instructions"
              },
              {
                step: "03",
                title: "Grow & Share",
                description: "Plant your garden, learn from experts, and share your success with the community"
              }
            ].map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                  <span className="text-2xl font-bold text-emerald-600">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-emerald-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied gardeners who have transformed their rooftops
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Rooftop Garden Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Join Tree Tales today and connect with Bangladesh's largest rooftop gardening community. 
            Buy plants, share with others, and grow your green space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold"
            >
              Get Started Now
            </Link>
            <Link 
              to="/products"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 font-semibold"
            >
              Browse Plants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;