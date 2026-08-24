const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const User = require('./models/user.model');
const Listing = require('./models/listing.model');

dotenv.config();

const mongoUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/rentnest';

const sampleListings = [
  {
    name: 'Premium 2 BHK Apartment — Rajarampuri',
    description:
      'Beautifully designed 2 BHK apartment located in the prime residential hub of Rajarampuri, Kolhapur. Features modular kitchen, spacious balcony with city views, 24x7 water supply, elevator, and covered parking. Close to markets, schools, and Shivaji University.',
    address: '6th Lane, Rajarampuri, Kolhapur, Maharashtra 416008',
    regularPrice: 18000,
    discountPrice: 16500,
    bathrooms: 2,
    bedrooms: 2,
    furnished: true,
    parking: true,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    name: 'Modern 2 BHK Flat — Tarabai Park',
    description:
      'Upscale 2 BHK flat situated in prestigious Tarabai Park area. Excellent ventilation, premium marble flooring, security cameras, power backup, and quiet neighborhood. Ideal for families and working professionals.',
    address: 'Near Circuit House, Tarabai Park, Kolhapur, Maharashtra 416003',
    regularPrice: 22000,
    discountPrice: 20000,
    bathrooms: 2,
    bedrooms: 2,
    furnished: true,
    parking: true,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    name: 'Spacious Family Home — Kasaba Bawada',
    description:
      'Spacious independent 3 BHK ground floor home with private lawn in Kasaba Bawada. Plenty of natural light, serene environment, large hall, and modern bathrooms. Very close to DY Patil Medical College and Line Bazar.',
    address: 'Sugar Mill Road, Kasaba Bawada, Kolhapur, Maharashtra 416006',
    regularPrice: 25000,
    discountPrice: 0,
    bathrooms: 3,
    bedrooms: 3,
    furnished: false,
    parking: true,
    type: 'rent',
    offer: false,
    imageUrls: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    name: 'Luxury Apartment — Shahupuri',
    description:
      'Exquisite 3 BHK luxury apartment right in the commercial and shopping heart of Shahupuri. Features smart home fittings, centralized air cooling, high-speed elevator, and dedicated reserved parking. Walking distance to Kolhapur Railway Station.',
    address: 'Station Road, 2nd Lane, Shahupuri, Kolhapur, Maharashtra 416001',
    regularPrice: 30000,
    discountPrice: 27500,
    bathrooms: 3,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    name: 'Comfortable 3 BHK Home — Nagala Park',
    description:
      'Sprawling 3 BHK residence in the elite neighborhood of Nagala Park. Surrounded by lush greenery, featuring large master bedroom with attached terrace, modern kitchen cabinets, and separate utility area.',
    address: 'Near Collector Office, Nagala Park, Kolhapur, Maharashtra 416003',
    regularPrice: 28000,
    discountPrice: 0,
    bathrooms: 2,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: 'rent',
    offer: false,
    imageUrls: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    name: 'Cozy 1 BHK Flat with Lake View — Rankala',
    description:
      'Charming 1 BHK flat just 200m from historic Rankala Lake. Enjoy evening walks around the lake promenade, fresh breeze, well-maintained society, and low maintenance. Ideal for bachelors or small families.',
    address: 'Rankala Lake Road, Hari Om Nagar, Kolhapur, Maharashtra 416012',
    regularPrice: 10000,
    discountPrice: 9000,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: true,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    name: 'Elegant 2 BHK Residency — Kalamba',
    description:
      'Affordable and peaceful 2 BHK apartment near Kalamba Lake. Clean air, quiet surroundings, 24h municipal water, and wide internal roads. Great connectivity to Gargoti Road and Kolhapur city.',
    address: 'Ring Road, Kalamba, Kolhapur, Maharashtra 416007',
    regularPrice: 12000,
    discountPrice: 0,
    bathrooms: 2,
    bedrooms: 2,
    furnished: false,
    parking: true,
    type: 'rent',
    offer: false,
    imageUrls: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    name: 'Residential 2 BHK Flat — Udyam Nagar',
    description:
      'Conveniently located 2 BHK residential apartment in Udyam Nagar. Near to main markets, bus stop, and commercial areas. Well lit rooms with safety grills and reserved two-wheeler/four-wheeler parking.',
    address: 'Main Road, Udyam Nagar, Kolhapur, Maharashtra 416008',
    regularPrice: 15000,
    discountPrice: 13500,
    bathrooms: 2,
    bedrooms: 2,
    furnished: false,
    parking: true,
    type: 'rent',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1502005229762-ae1b460020e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    name: 'Peaceful 2 BHK Flat — Vishrambag',
    description:
      'Pleasant and well-ventilated 2 BHK apartment situated in Vishrambag, Kolhapur. Gated society with round-the-clock security, children play area, and piped gas connection.',
    address: 'Near Vishrambag Circle, Kolhapur, Maharashtra 416004',
    regularPrice: 14000,
    discountPrice: 0,
    bathrooms: 2,
    bedrooms: 2,
    furnished: false,
    parking: true,
    type: 'rent',
    offer: false,
    imageUrls: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    name: 'Premium 3 BHK Independent Bungalow for Sale — Tarabai Park',
    description:
      'Magnificent 3 BHK independent bungalow available for sale in prime Tarabai Park. Private garden, 2 covered car parks, high ceilings, Italian marble flooring, and modular kitchen.',
    address: 'Green Meadows, Tarabai Park, Kolhapur, Maharashtra 416003',
    regularPrice: 9500000,
    discountPrice: 9000000,
    bathrooms: 3,
    bedrooms: 3,
    furnished: true,
    parking: true,
    type: 'sale',
    offer: true,
    imageUrls: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    ],
  },
];

async function seedDB() {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB for seeding');

    // Create or find a demo Kolhapur landlord user
    let demoUser = await User.findOne({ email: 'landlord@rentnest.in' });
    if (!demoUser) {
      const hashedPassword = bcryptjs.hashSync('rentnest123', 10);
      demoUser = await User.create({
        username: 'Kolhapur Properties',
        email: 'landlord@rentnest.in',
        password: hashedPassword,
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      });
      console.log('Demo landlord user created: landlord@rentnest.in');
    }

    // Clear existing listings and insert new Kolhapur listings
    await Listing.deleteMany({});
    console.log('Cleared existing listings');

    const listingsToInsert = sampleListings.map((listing) => ({
      ...listing,
      userRef: demoUser._id.toString(),
    }));

    await Listing.insertMany(listingsToInsert);
    console.log(`Successfully seeded ${listingsToInsert.length} Kolhapur listings into RentNest!`);

    await mongoose.disconnect();
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDB();
