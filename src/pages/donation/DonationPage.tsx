import React, { useState } from 'react';
import { 
  Heart, 
  Gift, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Mail,
  Camera,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Donation {
  id: string;
  title: string;
  description: string;
  image: string;
  donor: string;
  location: string;
  date: string;
  status: 'available' | 'claimed' | 'completed';
  category: string;
  condition: 'New' | 'Good' | 'Fair';
}

const DonationPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'browse' | 'donate' | 'my-donations'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDonateModal, setShowDonateModal] = useState(false);
  
  const [donateForm, setDonateForm] = useState({
    title: '',
    description: '',
    category: 'Indoor Plants',
    condition: 'Good' as 'New' | 'Good' | 'Fair',
    location: '',
    contactPhone: '',
    contactEmail: user?.email || '',
    image: ''
  });

  // Mock donations data
  const donations: Donation[] = [
    {
      id: '1',
      title: 'Healthy Snake Plant',
      description: 'Beautiful snake plant that has outgrown my space. Perfect for beginners!',
      image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400',
      donor: 'Sarah Ahmed',
      location: 'Dhanmondi, Dhaka',
      date: '2024-01-15',
      status: 'available',
      category: 'Indoor Plants',
      condition: 'Good'
    },
    {
      id: '2',
      title: 'Monstera Cutting',
      description: 'Fresh monstera cutting ready for propagation. Includes care instructions.',
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400',
      donor: 'Karim Hassan',
      location: 'Gulshan, Dhaka',
      date: '2024-01-12',
      status: 'claimed',
      category: 'Cuttings',
      condition: 'New'
    },
    {
      id: '3',
      title: 'Ceramic Plant Pots',
      description: 'Set of 3 ceramic pots in different sizes. Great for repotting.',
      image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=400',
      donor: 'Maya Patel',
      location: 'Uttara, Dhaka',
      date: '2024-01-10',
      status: 'available',
      category: 'Accessories',
      condition: 'Good'
    }
  ];

  const categories = ['all', 'Indoor Plants', 'Outdoor Plants', 'Cuttings', 'Seeds', 'Accessories', 'Tools'];

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || donation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donation submission
    console.log('Donation submitted:', donateForm);
    setShowDonateModal(false);
    // Reset form
    setDonateForm({
      title: '',
      description: '',
      category: 'Indoor Plants',
      condition: 'Good',
      location: '',
      contactPhone: '',
      contactEmail: user?.email || '',
      image: ''
    });
  };

  const handleClaimDonation = (donationId: string) => {
    // Handle claiming donation
    console.log('Claiming donation:', donationId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-100 p-4 rounded-full">
              <Heart className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plant Donation Hub</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share the joy of gardening by donating plants or find free plants from generous community members
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <div className="flex space-x-1">
              {[
                { id: 'browse', label: 'Browse Donations', icon: <Search className="h-4 w-4" /> },
                { id: 'donate', label: 'Donate Plants', icon: <Gift className="h-4 w-4" /> },
                { id: 'my-donations', label: 'My Donations', icon: <User className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Browse Donations Tab */}
        {activeTab === 'browse' && (
          <div className="space-y-8">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search donations..."
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

            {/* Donations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonations.map((donation) => (
                <div key={donation.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={donation.image}
                      alt={donation.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        donation.status === 'available' ? 'bg-green-100 text-green-800' :
                        donation.status === 'claimed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {donation.status === 'available' ? 'Available' :
                         donation.status === 'claimed' ? 'Claimed' : 'Completed'}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-white px-2 py-1 text-xs font-medium rounded-full">
                        {donation.condition}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{donation.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{donation.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{donation.donor}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{donation.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{donation.date}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleClaimDonation(donation.id)}
                      disabled={donation.status !== 'available'}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        donation.status === 'available'
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {donation.status === 'available' ? 'Claim Donation' :
                       donation.status === 'claimed' ? 'Already Claimed' : 'Completed'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDonations.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or check back later for new donations.</p>
              </div>
            )}
          </div>
        )}

        {/* Donate Plants Tab */}
        {activeTab === 'donate' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="text-center mb-8">
                <div className="bg-emerald-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Plants</h2>
                <p className="text-gray-600">
                  Help fellow gardeners by donating plants, cuttings, or gardening supplies
                </p>
              </div>

              <button
                onClick={() => setShowDonateModal(true)}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create New Donation</span>
              </button>

              <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
                <h3 className="font-semibold text-emerald-900 mb-3">How it works:</h3>
                <div className="space-y-2 text-sm text-emerald-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Post your donation with photos and description</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Community members can claim your donation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Coordinate pickup directly with the recipient</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Help grow our gardening community!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Donations Tab */}
        {activeTab === 'my-donations' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Donation History</h2>
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No donations yet</h3>
                <p className="text-gray-600 mb-4">
                  You haven't made any donations yet. Start sharing your plants with the community!
                </p>
                <button
                  onClick={() => setActiveTab('donate')}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Make Your First Donation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Donate Modal */}
        {showDonateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Create Donation</h3>
                  <button
                    onClick={() => setShowDonateModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleDonateSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={donateForm.title}
                    onChange={(e) => setDonateForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Healthy Snake Plant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={donateForm.description}
                    onChange={(e) => setDonateForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Describe your donation, its condition, and any care instructions..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={donateForm.category}
                      onChange={(e) => setDonateForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition *
                    </label>
                    <select
                      required
                      value={donateForm.condition}
                      onChange={(e) => setDonateForm(prev => ({ ...prev, condition: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="New">New</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={donateForm.location}
                    onChange={(e) => setDonateForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Dhanmondi, Dhaka"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={donateForm.contactPhone}
                      onChange={(e) => setDonateForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="+880 1234-567890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={donateForm.contactEmail}
                      onChange={(e) => setDonateForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Upload a photo of your donation</p>
                    <button
                      type="button"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Choose Photo
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Create Donation
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDonateModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationPage;