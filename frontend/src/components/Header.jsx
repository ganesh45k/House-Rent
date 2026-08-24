import { FaSearch } from 'react-icons/fa';
import { MdHomeWork } from 'react-icons/md';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl !== null) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-navy-900 text-white shadow-lg sticky top-0 z-50 border-b border-navy-800">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brandOrange-600 to-brandOrange-400 flex items-center justify-center text-white shadow-md shadow-brandOrange-500/20 group-hover:scale-105 transition-transform duration-200">
            <MdHomeWork className="text-2xl" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-bold text-xl sm:text-2xl tracking-tight">
              <span className="text-white">Rent</span>
              <span className="text-brandOrange-500">Nest</span>
            </div>
            <span className="text-[10px] text-slate-300 -mt-1 tracking-wider uppercase font-semibold">
              Kolhapur
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="bg-navy-800/90 border border-navy-700 hover:border-navy-600 focus-within:border-brandOrange-500 rounded-full px-4 py-2 flex items-center gap-2 w-44 sm:w-80 lg:w-96 transition-all duration-200"
        >
          <input
            type="text"
            placeholder="Search locality in Kolhapur..."
            className="bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" aria-label="Search" className="text-brandOrange-400 hover:text-brandOrange-300 transition-colors">
            <FaSearch className="text-sm" />
          </button>
        </form>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`hidden sm:inline-block px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/'
                ? 'text-brandOrange-400 font-semibold bg-navy-800'
                : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
            }`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`hidden md:inline-block px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/search'
                ? 'text-brandOrange-400 font-semibold bg-navy-800'
                : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
            }`}
          >
            Explore
          </Link>
          <Link
            to="/about"
            className={`hidden sm:inline-block px-3 py-1.5 rounded-lg transition-colors ${
              location.pathname === '/about'
                ? 'text-brandOrange-400 font-semibold bg-navy-800'
                : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
            }`}
          >
            About
          </Link>

          {currentUser ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1 pr-3 rounded-full bg-navy-800 hover:bg-navy-700 border border-navy-700 transition-all"
            >
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-brandOrange-500"
                src={currentUser.avatar}
                alt={currentUser.username || 'Profile'}
              />
              <span className="hidden lg:inline text-xs text-slate-200 font-semibold max-w-[100px] truncate">
                {currentUser.username}
              </span>
            </Link>
          ) : (
            <Link
              to="/sign-in"
              className="bg-brandOrange-500 hover:bg-brandOrange-600 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 shadow-md shadow-brandOrange-500/20 hover:shadow-brandOrange-500/40"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
