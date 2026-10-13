import { MdHomeWork, MdVerified, MdLocationCity, MdSupportAgent } from 'react-icons/md';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandOrange-50 border border-brandOrange-200 text-brandOrange-700 text-xs font-semibold mb-4">
            Kolhapur&apos;s Dedicated House Rental Platform
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            About <span className="text-brandOrange-500">RentNest</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            &ldquo;Find Your Perfect Home in Kolhapur&rdquo; — We connect families, working professionals, and students with verified rental homes across the historic city of Kolhapur, Maharashtra.
          </p>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-navy-900">
            Our Mission & Story in Kolhapur
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded with a vision to simplify house hunting in Southern Maharashtra, <strong>RentNest</strong> is built specifically for the residents and newcomers of Kolhapur. From the lively residential avenues of <strong>Rajarampuri</strong> and the lush serene enclaves of <strong>Tarabai Park</strong>, to the central convenience of <strong>Shahupuri</strong>, historic <strong>Kasaba Bawada</strong>, and picturesque <strong>Rankala Lake</strong>, we provide complete transparency in home rentals.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We believe finding a house should be free of inflated brokerages, hidden charges, and outdated photos. On RentNest, every property listing contains genuine photographs, accurate Indian Rupee monthly rental prices, precise amenity details (parking, furnishing, water supply), and direct landlord communication.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-brandOrange-50 text-brandOrange-600 flex items-center justify-center text-3xl mb-4">
              <MdVerified />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Verified Kolhapur Listings</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every house, flat, and apartment is verified for location accuracy and clear monthly rental pricing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center text-3xl mb-4">
              <MdLocationCity />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Neighborhood Focused</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Deep local coverage across Rajarampuri, Tarabai Park, Shahupuri, Kasaba Bawada, Nagala Park, Kalamba, and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mb-4">
              <MdSupportAgent />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Direct Owner Connect</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Inquire directly with property owners and landlords without middleman hassles or delays.
            </p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-bold text-white">Ready to find your new home in Kolhapur?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Browse hundreds of verified flats and houses available for rent today.</p>
          </div>
          <Link
            to="/search"
            className="bg-brandOrange-500 hover:bg-brandOrange-600 text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg shadow-brandOrange-500/20 flex-shrink-0"
          >
            Explore Kolhapur Rentals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
