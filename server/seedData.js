import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';
import Donation from './models/Donation.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/treetales');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Donation.deleteMany({});
    console.log('Cleared existing data...');

    // Create admin user
    const adminUser = new User({
      name: 'Sabbir',
      email: 'sabbir.hossain.28678@gmail.com',
      password: 'Test@123',
      phone: '+880 1712-345678',
      address: 'Dhaka, Bangladesh',
      role: 'admin',
      isApproved: true,
      emailVerified: true
    });
    await adminUser.save();
    console.log('Admin user created...');

    // Create demo users
    const demoUsers = [
      {
        name: 'Dr. Fatima Rahman',
        email: 'fatima@treetales.com',
        password: 'password123',
        phone: '+880 1712-111111',
        address: 'Dhanmondi, Dhaka',
        role: 'seller',
        isApproved: true,
        emailVerified: true
      },
      {
        name: 'Ahmed Hassan',
        email: 'ahmed@treetales.com',
        password: 'password123',
        phone: '+880 1712-222222',
        address: 'Gulshan, Dhaka',
        role: 'seller',
        isApproved: true,
        emailVerified: true
      },
      {
        name: 'Maya Patel',
        email: 'maya@treetales.com',
        password: 'password123',
        phone: '+880 1712-333333',
        address: 'Uttara, Dhaka',
        role: 'buyer',
        isApproved: true,
        emailVerified: true
      },
      {
        name: 'Karim Hassan',
        email: 'karim@treetales.com',
        password: 'password123',
        phone: '+880 1712-444444',
        address: 'Chittagong',
        role: 'donor',
        isApproved: true,
        emailVerified: true
      },
      {
        name: 'Sarah Ahmed',
        email: 'sarah@treetales.com',
        password: 'password123',
        phone: '+880 1712-555555',
        address: 'Sylhet',
        role: 'buyer',
        isApproved: true,
        emailVerified: true
      },
      {
        name: 'Rashid Ahmed',
        email: 'rashid@treetales.com',
        password: 'password123',
        phone: '+880 1712-666666',
        address: 'Rajshahi',
        role: 'seller',
        isApproved: true,
        emailVerified: true
      }
    ];

    const createdUsers = [];
    for (const userData of demoUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
    }
    console.log('Demo users created...');

    // Get seller users for products
    const sellers = createdUsers.filter(user => user.role === 'seller');

    // Create demo products
    const demoProducts = [
      {
        name: 'Monstera Deliciosa',
        description: 'The Monstera Deliciosa, also known as the Swiss Cheese Plant, is a stunning tropical plant that makes a perfect statement piece for any home. With its iconic split leaves and easy-care nature, it\'s ideal for both beginners and experienced plant parents.',
        price: 1200,
        originalPrice: 1500,
        images: [
          'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Indoor Plants',
        seller: sellers[0]._id,
        sellerName: sellers[0].name,
        location: 'Dhaka',
        difficulty: 'Easy',
        lightRequirement: 'Medium',
        waterFrequency: 'Weekly',
        temperature: '18-24°C',
        humidity: '40-60%',
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
        stockCount: 15,
        inStock: true,
        featured: true,
        isApproved: true,
        rating: 4.8,
        reviewCount: 124,
        tags: ['monstera', 'indoor', 'tropical', 'easy-care']
      },
      {
        name: 'Snake Plant (Sansevieria)',
        description: 'The Snake Plant is one of the most popular and hardy houseplants. Known for its striking upright leaves and incredible tolerance for neglect, it\'s perfect for busy people or beginners.',
        price: 800,
        images: [
          'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Indoor Plants',
        seller: sellers[1]._id,
        sellerName: sellers[1].name,
        location: 'Chittagong',
        difficulty: 'Easy',
        lightRequirement: 'Low',
        waterFrequency: 'Bi-weekly',
        temperature: '15-25°C',
        humidity: '30-50%',
        careInstructions: [
          'Tolerates low light conditions',
          'Water sparingly, allow soil to dry completely',
          'Avoid overwatering to prevent root rot',
          'Clean leaves with damp cloth monthly',
          'Fertilize 2-3 times per year'
        ],
        benefits: [
          'Excellent air purifier',
          'Extremely low maintenance',
          'Tolerates neglect',
          'Produces oxygen at night',
          'Pet-safe option available'
        ],
        stockCount: 25,
        inStock: true,
        featured: true,
        isApproved: true,
        rating: 4.9,
        reviewCount: 89,
        tags: ['snake-plant', 'low-light', 'air-purifier', 'beginner']
      },
      {
        name: 'Peace Lily',
        description: 'The Peace Lily is an elegant flowering houseplant known for its beautiful white blooms and glossy green leaves. It\'s an excellent choice for adding sophistication to any indoor space.',
        price: 600,
        images: [
          'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Flowering Plants',
        seller: sellers[2]._id,
        sellerName: sellers[2].name,
        location: 'Sylhet',
        difficulty: 'Medium',
        lightRequirement: 'Medium',
        waterFrequency: 'Twice weekly',
        temperature: '18-23°C',
        humidity: '50-60%',
        careInstructions: [
          'Keep soil consistently moist but not soggy',
          'Provide bright, indirect light',
          'Mist leaves regularly for humidity',
          'Remove spent flowers to encourage new blooms',
          'Fertilize monthly during growing season'
        ],
        benefits: [
          'Beautiful white flowers',
          'Air purifying plant',
          'Indicates watering needs by drooping',
          'Removes harmful toxins',
          'Long-lasting blooms'
        ],
        stockCount: 12,
        inStock: true,
        featured: false,
        isApproved: true,
        rating: 4.6,
        reviewCount: 67,
        tags: ['peace-lily', 'flowering', 'air-purifier', 'elegant']
      },
      {
        name: 'Fiddle Leaf Fig',
        description: 'The Fiddle Leaf Fig is a trendy statement plant with large, violin-shaped leaves. While it requires a bit more attention, its dramatic appearance makes it worth the effort.',
        price: 2500,
        images: [
          'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Indoor Plants',
        seller: sellers[0]._id,
        sellerName: sellers[0].name,
        location: 'Dhaka',
        difficulty: 'Hard',
        lightRequirement: 'High',
        waterFrequency: 'Weekly',
        temperature: '20-25°C',
        humidity: '45-65%',
        careInstructions: [
          'Provide bright, indirect light near a window',
          'Water when top 2 inches of soil are dry',
          'Avoid moving the plant frequently',
          'Clean leaves weekly with damp cloth',
          'Fertilize monthly in spring and summer'
        ],
        benefits: [
          'Dramatic architectural presence',
          'Instagram-worthy statement piece',
          'Air purifying qualities',
          'Can grow quite tall',
          'Adds tropical feel to space'
        ],
        stockCount: 8,
        inStock: true,
        featured: true,
        isApproved: true,
        rating: 4.4,
        reviewCount: 45,
        tags: ['fiddle-leaf-fig', 'statement-plant', 'tropical', 'trendy']
      },
      {
        name: 'Rubber Plant (Ficus Elastica)',
        description: 'The Rubber Plant is a classic houseplant with glossy, dark green leaves. It\'s relatively easy to care for and can grow into an impressive indoor tree.',
        price: 900,
        images: [
          'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Indoor Plants',
        seller: sellers[1]._id,
        sellerName: sellers[1].name,
        location: 'Rajshahi',
        difficulty: 'Easy',
        lightRequirement: 'Medium',
        waterFrequency: 'Weekly',
        temperature: '16-24°C',
        humidity: '40-50%',
        careInstructions: [
          'Place in bright, indirect light',
          'Water when soil surface is dry',
          'Wipe leaves to maintain glossy appearance',
          'Prune to maintain desired size',
          'Fertilize monthly during growing season'
        ],
        benefits: [
          'Hardy and forgiving',
          'Beautiful glossy foliage',
          'Can grow into a tree',
          'Air purifying qualities',
          'Classic houseplant appeal'
        ],
        stockCount: 0,
        inStock: false,
        featured: false,
        isApproved: true,
        rating: 4.7,
        reviewCount: 92,
        tags: ['rubber-plant', 'ficus', 'glossy-leaves', 'classic']
      },
      {
        name: 'Golden Pothos',
        description: 'The Golden Pothos is one of the easiest houseplants to grow. Its trailing vines with heart-shaped leaves make it perfect for hanging baskets or shelves.',
        price: 400,
        images: [
          'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Hanging Plants',
        seller: sellers[2]._id,
        sellerName: sellers[2].name,
        location: 'Khulna',
        difficulty: 'Easy',
        lightRequirement: 'Low',
        waterFrequency: 'Weekly',
        temperature: '17-30°C',
        humidity: '40-60%',
        careInstructions: [
          'Thrives in low to medium light',
          'Water when soil feels dry',
          'Trim vines to encourage bushier growth',
          'Can be propagated easily in water',
          'Fertilize monthly during growing season'
        ],
        benefits: [
          'Extremely easy to care for',
          'Fast growing',
          'Air purifying',
          'Easy to propagate',
          'Tolerates various conditions'
        ],
        stockCount: 30,
        inStock: true,
        featured: true,
        isApproved: true,
        rating: 4.9,
        reviewCount: 156,
        tags: ['pothos', 'trailing', 'easy-care', 'hanging']
      },
      {
        name: 'ZZ Plant (Zamioculcas Zamiifolia)',
        description: 'The ZZ Plant is virtually indestructible and perfect for low-light spaces. Its waxy, dark green leaves add a modern touch to any room.',
        price: 750,
        images: [
          'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Indoor Plants',
        seller: sellers[0]._id,
        sellerName: sellers[0].name,
        location: 'Dhaka',
        difficulty: 'Easy',
        lightRequirement: 'Low',
        waterFrequency: 'Monthly',
        temperature: '18-26°C',
        humidity: '30-50%',
        careInstructions: [
          'Tolerates very low light',
          'Water only when soil is completely dry',
          'Avoid overwatering at all costs',
          'Clean leaves occasionally',
          'Fertilize 2-3 times per year'
        ],
        benefits: [
          'Extremely drought tolerant',
          'Thrives in low light',
          'Modern, architectural look',
          'Air purifying',
          'Nearly indestructible'
        ],
        stockCount: 18,
        inStock: true,
        featured: false,
        isApproved: true,
        rating: 4.8,
        reviewCount: 78,
        tags: ['zz-plant', 'drought-tolerant', 'low-light', 'modern']
      },
      {
        name: 'Spider Plant',
        description: 'The Spider Plant is a classic houseplant known for its long, arching leaves and baby plantlets. It\'s perfect for beginners and easy to propagate.',
        price: 350,
        images: [
          'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Hanging Plants',
        seller: sellers[1]._id,
        sellerName: sellers[1].name,
        location: 'Chittagong',
        difficulty: 'Easy',
        lightRequirement: 'Medium',
        waterFrequency: 'Twice weekly',
        temperature: '18-24°C',
        humidity: '40-55%',
        careInstructions: [
          'Provide bright, indirect light',
          'Keep soil evenly moist',
          'Propagate baby plants easily',
          'Remove brown tips with scissors',
          'Fertilize monthly during growing season'
        ],
        benefits: [
          'Safe for pets',
          'Easy to propagate',
          'Air purifying',
          'Fast growing',
          'Produces baby plants'
        ],
        stockCount: 22,
        inStock: true,
        featured: false,
        isApproved: true,
        rating: 4.7,
        reviewCount: 134,
        tags: ['spider-plant', 'pet-safe', 'easy-propagation', 'hanging']
      },
      {
        name: 'Aloe Vera',
        description: 'Aloe Vera is a succulent plant with thick, fleshy leaves containing healing gel. It\'s both decorative and functional, perfect for sunny windowsills.',
        price: 450,
        images: [
          'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Succulents',
        seller: sellers[2]._id,
        sellerName: sellers[2].name,
        location: 'Khulna',
        difficulty: 'Easy',
        lightRequirement: 'High',
        waterFrequency: 'Bi-weekly',
        temperature: '20-25°C',
        humidity: '30-40%',
        careInstructions: [
          'Place in bright, direct sunlight',
          'Water deeply but infrequently',
          'Use well-draining cactus soil',
          'Allow soil to dry completely between waterings',
          'Fertilize sparingly, 2-3 times per year'
        ],
        benefits: [
          'Medicinal healing properties',
          'Extremely drought tolerant',
          'Easy to propagate',
          'Air purifying',
          'Low maintenance'
        ],
        stockCount: 35,
        inStock: true,
        featured: false,
        isApproved: true,
        rating: 4.6,
        reviewCount: 98,
        tags: ['aloe-vera', 'succulent', 'medicinal', 'drought-tolerant']
      },
      {
        name: 'Boston Fern',
        description: 'The Boston Fern is a lush, feathery plant that adds a tropical feel to any space. It thrives in humid conditions and makes an excellent hanging plant.',
        price: 550,
        images: [
          'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Hanging Plants',
        seller: sellers[0]._id,
        sellerName: sellers[0].name,
        location: 'Dhaka',
        difficulty: 'Medium',
        lightRequirement: 'Medium',
        waterFrequency: 'Twice weekly',
        temperature: '18-22°C',
        humidity: '60-70%',
        careInstructions: [
          'Provide bright, indirect light',
          'Keep soil consistently moist',
          'Mist regularly for humidity',
          'Trim brown fronds regularly',
          'Fertilize monthly during growing season'
        ],
        benefits: [
          'Beautiful feathery foliage',
          'Excellent air humidifier',
          'Classic hanging plant',
          'Air purifying',
          'Adds tropical ambiance'
        ],
        stockCount: 14,
        inStock: true,
        featured: false,
        isApproved: true,
        rating: 4.3,
        reviewCount: 56,
        tags: ['boston-fern', 'feathery', 'humid-loving', 'hanging']
      },
      {
        name: 'Jade Plant',
        description: 'The Jade Plant is a beautiful succulent with thick, glossy leaves. It\'s considered a symbol of good luck and prosperity in many cultures.',
        price: 320,
        images: [
          'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Succulents',
        seller: sellers[1]._id,
        sellerName: sellers[1].name,
        location: 'Chittagong',
        difficulty: 'Easy',
        lightRequirement: 'High',
        waterFrequency: 'Bi-weekly',
        temperature: '18-24°C',
        humidity: '30-40%',
        careInstructions: [
          'Place in bright, direct sunlight',
          'Water when soil is completely dry',
          'Use well-draining succulent soil',
          'Prune to maintain shape',
          'Fertilize sparingly in spring'
        ],
        benefits: [
          'Symbol of good luck',
          'Very drought tolerant',
          'Easy to propagate',
          'Long-lived plant',
          'Attractive thick leaves'
        ],
        stockCount: 28,
        inStock: true,
        featured: false,
        isApproved: true,
        rating: 4.5,
        reviewCount: 73,
        tags: ['jade-plant', 'succulent', 'good-luck', 'drought-tolerant']
      },
      {
        name: 'Philodendron Heartleaf',
        description: 'The Heartleaf Philodendron is a fast-growing trailing plant with heart-shaped leaves. It\'s incredibly easy to care for and perfect for beginners.',
        price: 380,
        images: [
          'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Hanging Plants',
        seller: sellers[2]._id,
        sellerName: sellers[2].name,
        location: 'Khulna',
        difficulty: 'Easy',
        lightRequirement: 'Low',
        waterFrequency: 'Weekly',
        temperature: '18-26°C',
        humidity: '40-60%',
        careInstructions: [
          'Tolerates low to medium light',
          'Water when top inch of soil is dry',
          'Trim vines to encourage bushiness',
          'Easy to propagate in water',
          'Fertilize monthly during growing season'
        ],
        benefits: [
          'Heart-shaped leaves',
          'Fast growing',
          'Easy to propagate',
          'Tolerates low light',
          'Air purifying'
        ],
        stockCount: 20,
        inStock: true,
        featured: false,
        isApproved: true,
        rating: 4.8,
        reviewCount: 112,
        tags: ['philodendron', 'heart-shaped', 'trailing', 'easy-care']
      },
      {
        name: 'Bird of Paradise',
        description: 'The Bird of Paradise is a stunning tropical plant with large, paddle-shaped leaves. It can eventually produce exotic orange and blue flowers.',
        price: 1800,
        originalPrice: 2200,
        images: [
          'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        category: 'Indoor Plants',
        seller: sellers[0]._id,
        sellerName: sellers[0].name,
        location: 'Dhaka',
        difficulty: 'Medium',
        lightRequirement: 'High',
        waterFrequency: 'Weekly',
        temperature: '20-25°C',
        humidity: '50-60%',
        careInstructions: [
          'Provide bright, direct sunlight',
          'Water when top inch of soil is dry',
          'Mist leaves regularly',
          'Rotate weekly for even growth',
          'Fertilize monthly during growing season'
        ],
        benefits: [
          'Dramatic tropical appearance',
          'Can produce exotic flowers',
          'Fast growing',
          'Air purifying',
          'Statement piece'
        ],
        stockCount: 6,
        inStock: true,
        featured: true,
        isApproved: true,
        rating: 4.5,
        reviewCount: 34,
        tags: ['bird-of-paradise', 'tropical', 'flowering', 'dramatic']
      }
    ];

    for (const productData of demoProducts) {
      const product = new Product(productData);
      await product.save();
    }
    console.log('Demo products created...');

    // Create demo donations
    const donors = createdUsers.filter(user => user.role === 'donor' || user.role === 'buyer');
    
    const demoDonations = [
      {
        title: 'Healthy Snake Plant',
        description: 'Beautiful snake plant that has outgrown my space. Perfect for beginners! The plant is about 2 feet tall and has been well-cared for. Comes with care instructions.',
        image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400',
        donor: donors[0]._id,
        donorName: donors[0].name,
        category: 'Indoor Plants',
        condition: 'Good',
        location: 'Dhanmondi, Dhaka',
        contactPhone: '+880 1712-777777',
        contactEmail: donors[0].email,
        status: 'available',
        isApproved: true,
        approvedBy: adminUser._id,
        approvedAt: new Date()
      },
      {
        title: 'Monstera Cutting',
        description: 'Fresh monstera cutting ready for propagation. Includes care instructions and rooting hormone. Perfect for someone wanting to start their monstera collection.',
        image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400',
        donor: donors[1]._id,
        donorName: donors[1].name,
        category: 'Cuttings',
        condition: 'New',
        location: 'Gulshan, Dhaka',
        contactPhone: '+880 1712-888888',
        contactEmail: donors[1].email,
        status: 'claimed',
        claimedBy: createdUsers[2]._id,
        claimedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isApproved: true,
        approvedBy: adminUser._id,
        approvedAt: new Date()
      },
      {
        title: 'Ceramic Plant Pots Set',
        description: 'Set of 3 ceramic pots in different sizes (small, medium, large). Great for repotting. White color with drainage holes. Barely used.',
        image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=400',
        donor: donors[2]._id,
        donorName: donors[2].name,
        category: 'Accessories',
        condition: 'Good',
        location: 'Uttara, Dhaka',
        contactPhone: '+880 1712-999999',
        contactEmail: donors[2].email,
        status: 'available',
        isApproved: true,
        approvedBy: adminUser._id,
        approvedAt: new Date()
      },
      {
        title: 'Gardening Tool Kit',
        description: 'Complete gardening tool set including small shovel, pruning shears, watering can, and plant labels. Perfect for someone starting their gardening journey.',
        image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
        donor: adminUser._id,
        donorName: adminUser.name,
        category: 'Tools',
        condition: 'Good',
        location: 'Dhaka',
        contactPhone: '+880 1712-345678',
        contactEmail: adminUser.email,
        status: 'available',
        isApproved: true,
        approvedBy: adminUser._id,
        approvedAt: new Date()
      },
      {
        title: 'Succulent Collection',
        description: 'Collection of 5 small succulents in decorative pots. Includes echeveria, jade plant, and other varieties. Perfect for desk or windowsill.',
        image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400',
        donor: donors[0]._id,
        donorName: donors[0].name,
        category: 'Succulents',
        condition: 'Good',
        location: 'Dhanmondi, Dhaka',
        contactPhone: '+880 1712-777777',
        contactEmail: donors[0].email,
        status: 'completed',
        claimedBy: createdUsers[4]._id,
        claimedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isApproved: true,
        approvedBy: adminUser._id,
        approvedAt: new Date()
      }
    ];

    for (const donationData of demoDonations) {
      const donation = new Donation(donationData);
      await donation.save();
    }
    console.log('Demo donations created...');

    console.log('✅ Seed data created successfully!');
    console.log('\n📋 Demo Accounts:');
    console.log('👑 Admin: sabbir.hossain.28678@gmail.com / Test@123');
    console.log('🛒 Buyer: maya@treetales.com / password123');
    console.log('🏪 Seller: fatima@treetales.com / password123');
    console.log('💝 Donor: karim@treetales.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();