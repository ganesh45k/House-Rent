import { MdHomeWork, MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
  const localities = [
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

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brandOrange-600 to-brandOrange-400 flex items-center justify-center text-white shadow-md shadow-brandOrange-500/20">
                <MdHomeWork className="text-xl" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-bold text-xl text-white">
                  <span>Rent</span>
                  <span className="text-brandOrange-500">Nest</span>
                </div>
                <span className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase font-semibold">
                  Kolhapur, Maharashtra
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Kolhapur&apos;s trusted house rental platform. Discover verified 1 BHK, 2 BHK, 3 BHK apartments, independent houses, and villas with transparent pricing.
            </p>
            <div className="text-xs text-brandOrange-400 font-medium">
              &ldquo;Find Your Perfect Home in Kolhapur&rdquo;
            </div>
          </div>

          {/* Col 2: Kolhapur Localities */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              Popular Localities
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {localities.map((loc) => (
                <Link
                  key={loc}
                  to={`/search?searchTerm=${encodeURIComponent(loc)}`}
                  className="text-slate-400 hover:text-brandOrange-400 transition-colors py-0.5 flex items-center gap-1"
                >
                  <span className="text-brandOrange-500 text-xs">›</span> {loc}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-brandOrange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search?type=rent" className="hover:text-brandOrange-400 transition-colors">
                  Rental Properties in Kolhapur
                </Link>
              </li>
              <li>
                <Link to="/search?offer=true" className="hover:text-brandOrange-400 transition-colors">
                  Discounted Offers
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="hover:text-brandOrange-400 transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brandOrange-400 transition-colors">
                  About RentNest
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              Kolhapur Office
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MdLocationOn className="text-brandOrange-500 text-lg flex-shrink-0 mt-0.5" />
                <span>Rajarampuri Main Road, Near Bus Stand, Kolhapur, Maharashtra 416008</span>
              </li>
              <li className="flex items-center gap-2">
                <MdPhone className="text-brandOrange-500 text-base flex-shrink-0" />
                <span>+91 231 265 4321 / +91 98220 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-brandOrange-500 text-base flex-shrink-0" />
                <span>support@rentnest.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} RentNest Technologies. All rights reserved. Designed for Kolhapur.</p>
          <div className="flex gap-4">
            <span className="text-slate-400">Maharashtra, India</span>
            <span>•</span>
            <span className="text-brandOrange-400">Verified Kolhapur Listings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
