import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { FaSearch, FaShieldAlt, FaHandshake, FaTags, FaArrowRight } from 'react-icons/fa';
import { MdLocationOn, MdHome } from 'react-icons/md';

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [searchLocality, setSearchLocality] = useState('');
  const [searchType, setSearchType] = useState('rent');
  const navigate = useNavigate();

  SwiperCore.use([Navigation, Autoplay]);

  const kolhapurLocalities = [
    'Rajarampuri',
    'Tarabai Park',
    'Shahupuri',
    'Kasaba Bawada',
    'Nagala Park',
    'Kalamba',
    'Rankala',
    'Udyam Nagar',
    'Vishrambag',
  ];

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (searchLocality) urlParams.set('searchTerm', searchLocality);
    if (searchType) urlParams.set('type', searchType);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/80 border border-navy-700 text-brandOrange-400 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brandOrange-500 animate-pulse"></span>
            #1 House Rental Platform in Kolhapur
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
            Find Your Perfect Home in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandOrange-400 to-amber-300">Kolhapur</span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-lg max-w-2xl font-normal leading-relaxed">
            Explore verified rental properties across Kolhapur and find a home that fits your lifestyle and budget.
          </p>

          {/* Quick Search Card */}
          <form
            onSubmit={handleHeroSearch}
            className="w-full max-w-3xl mt-10 bg-white p-3 sm:p-4 rounded-2xl shadow-2xl text-slate-800 flex flex-col sm:flex-row gap-3 border border-slate-100"
          >
            {/* Location Input */}
            <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
              <MdLocationOn className="text-brandOrange-500 text-xl flex-shrink-0" />
              <input
                type="text"
                placeholder="Enter locality (e.g. Rajarampuri, Tarabai Park)"
                className="bg-transparent text-sm w-full focus:outline-none text-slate-800 placeholder-slate-400 font-medium"
                value={searchLocality}
                onChange={(e) => setSearchLocality(e.target.value)}
              />
            </div>

            {/* Property Type Selector */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 sm:w-44">
              <MdHome className="text-brandOrange-500 text-xl flex-shrink-0" />
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="bg-transparent text-sm w-full focus:outline-none text-slate-700 font-semibold cursor-pointer"
              >
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
                <option value="all">Rent & Sale</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-brandOrange-500 hover:bg-brandOrange-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-brandOrange-500/20 flex items-center justify-center gap-2 sm:w-auto"
            >
              <FaSearch className="text-sm" />
              <span>Search</span>
            </button>
          </form>

          {/* Quick Locality Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-1">
              Popular Localities:
            </span>
            {kolhapurLocalities.map((locality) => (
              <Link
                key={locality}
                to={`/search?searchTerm=${encodeURIComponent(locality)}`}
                className="text-xs bg-navy-800/80 hover:bg-brandOrange-500 text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-navy-700 hover:border-brandOrange-500 transition-all duration-200"
              >
                {locality}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Swiper Slider */}
      {offerListings && offerListings.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 -mt-12 sm:px-6 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <Swiper navigation autoplay={{ delay: 4000 }}>
              {offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    style={{
                      background: `linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.7)), url(${
                        listing.imageUrls[0] ||
                        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
                      }) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                    className="h-[360px] sm:h-[480px] flex items-end p-6 sm:p-12 text-white"
                  >
                    <div className="max-w-xl">
                      <span className="bg-brandOrange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                        Featured in Kolhapur
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-bold drop-shadow-md">
                        {listing.name}
                      </h2>
                      <p className="text-slate-200 text-sm sm:text-base mt-2 drop-shadow flex items-center gap-1 font-medium">
                        <MdLocationOn className="text-brandOrange-400" />
                        {listing.address}
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <span className="text-xl sm:text-2xl font-extrabold text-white">
                          ₹{Number(listing.offer ? listing.discountPrice : listing.regularPrice).toLocaleString('en-IN')}
                          {listing.type === 'rent' && <span className="text-xs font-normal text-slate-300"> / month</span>}
                        </span>
                        <Link
                          to={`/listing/${listing._id}`}
                          className="bg-white hover:bg-slate-100 text-navy-900 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Value Proposition: Why RentNest */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
            Why Rent Homes with <span className="text-brandOrange-500">RentNest</span>?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Tailored specifically for the Kolhapur residential community with genuine listings and direct contacts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-brandOrange-50 text-brandOrange-600 flex items-center justify-center text-2xl mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">100% Verified Local Properties</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every flat, apartment, and house in Kolhapur is verified with accurate photos, location details, and pricing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-brandOrange-50 text-brandOrange-600 flex items-center justify-center text-2xl mb-4">
              <FaHandshake />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Direct Landlord Connect</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Connect directly with Kolhapur property owners and landlords without middleman hassles or surprise fees.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-brandOrange-50 text-brandOrange-600 flex items-center justify-center text-2xl mb-4">
              <FaTags />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Transparent Monthly Rents</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Clear INR pricing with furnished/parking amenities clearly labeled for every locality in Kolhapur.
            </p>
          </div>
        </div>
      </section>

      {/* Listing Results Sections */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 flex flex-col gap-12">
        {/* Recent Offers Section */}
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-bold text-brandOrange-500 uppercase tracking-wider">
                  Special Discounts
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                  Recent Offers in Kolhapur
                </h2>
              </div>
              <Link
                className="text-xs sm:text-sm text-brandOrange-600 font-bold hover:text-brandOrange-700 flex items-center gap-1 group"
                to={'/search?offer=true'}
              >
                <span>View all offers</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Places for Rent */}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-bold text-brandOrange-500 uppercase tracking-wider">
                  Monthly Rentals
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                  Verified Homes for Rent in Kolhapur
                </h2>
              </div>
              <Link
                className="text-xs sm:text-sm text-brandOrange-600 font-bold hover:text-brandOrange-700 flex items-center gap-1 group"
                to={'/search?type=rent'}
              >
                <span>View all rentals</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Places for Sale */}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-bold text-brandOrange-500 uppercase tracking-wider">
                  Property Ownership
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                  Featured Properties for Sale
                </h2>
              </div>
              <Link
                className="text-xs sm:text-sm text-brandOrange-600 font-bold hover:text-brandOrange-700 flex items-center gap-1 group"
                to={'/search?type=sale'}
              >
                <span>View all properties</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Landlord CTA banner */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-navy-700">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Own a House or Flat in Kolhapur?
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              List your rental property on RentNest and reach thousands of verified tenants looking for homes across Rajarampuri, Tarabai Park, and all Kolhapur areas.
            </p>
          </div>
          <Link
            to="/create-listing"
            className="bg-brandOrange-500 hover:bg-brandOrange-600 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-brandOrange-500/30 flex-shrink-0 text-sm"
          >
            List Your Property Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
