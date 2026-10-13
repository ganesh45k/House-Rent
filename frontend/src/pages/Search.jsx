import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { FaSearch, FaFilter, FaRedo } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const Search = () => {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

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
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'createdAt';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleLocalityClick = (locality) => {
    const newSearchTerm = sidebardata.searchTerm === locality ? '' : locality;
    setSidebardata({ ...sidebardata, searchTerm: newSearchTerm });
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', newSearchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleReset = () => {
    setSidebardata({
      searchTerm: '',
      type: 'all',
      parking: false,
      furnished: false,
      offer: false,
      sort: 'createdAt',
      order: 'desc',
    });
    navigate('/search');
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8 sm:px-6 gap-8">
      {/* Filters Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-navy-900 font-bold text-lg">
              <FaFilter className="text-brandOrange-500 text-sm" />
              <span>Search Filters</span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-brandOrange-600 flex items-center gap-1 transition-colors"
            >
              <FaRedo className="text-[10px]" /> Reset
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
            {/* Search Term */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Locality / Keyword:
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="e.g. Rajarampuri, Tarabai Park"
                  className="border border-slate-300 rounded-xl p-3 text-sm w-full focus:outline-none focus:border-brandOrange-500 pr-9"
                  value={sidebardata.searchTerm}
                  onChange={handleChange}
                />
                <MdLocationOn className="absolute right-3 top-3.5 text-slate-400 text-lg pointer-events-none" />
              </div>
            </div>

            {/* Quick Kolhapur Locality Chips */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Popular Kolhapur Areas:
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {kolhapurLocalities.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleLocalityClick(loc)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      sidebardata.searchTerm.toLowerCase() === loc.toLowerCase()
                        ? 'bg-navy-900 text-white border-navy-900 font-semibold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brandOrange-500 hover:text-brandOrange-600'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Listing Type:
              </label>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300">
                  <input
                    type="checkbox"
                    id="all"
                    className="accent-brandOrange-500 w-4 h-4 rounded"
                    onChange={handleChange}
                    checked={sidebardata.type === 'all'}
                  />
                  <span className="text-xs font-medium">Rent & Sale</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300">
                  <input
                    type="checkbox"
                    id="rent"
                    className="accent-brandOrange-500 w-4 h-4 rounded"
                    onChange={handleChange}
                    checked={sidebardata.type === 'rent'}
                  />
                  <span className="text-xs font-medium">Rent</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300">
                  <input
                    type="checkbox"
                    id="sale"
                    className="accent-brandOrange-500 w-4 h-4 rounded"
                    onChange={handleChange}
                    checked={sidebardata.type === 'sale'}
                  />
                  <span className="text-xs font-medium">Sale</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300">
                  <input
                    type="checkbox"
                    id="offer"
                    className="accent-brandOrange-500 w-4 h-4 rounded"
                    onChange={handleChange}
                    checked={sidebardata.offer}
                  />
                  <span className="text-xs font-medium">Offer</span>
                </label>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Amenities:
              </label>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300">
                  <input
                    type="checkbox"
                    id="parking"
                    className="accent-brandOrange-500 w-4 h-4 rounded"
                    onChange={handleChange}
                    checked={sidebardata.parking}
                  />
                  <span className="text-xs font-medium">Parking</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="accent-brandOrange-500 w-4 h-4 rounded"
                    onChange={handleChange}
                    checked={sidebardata.furnished}
                  />
                  <span className="text-xs font-medium">Furnished</span>
                </label>
              </div>
            </div>

            {/* Sort Order */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Sort Properties:
              </label>
              <select
                onChange={handleChange}
                value={`${sidebardata.sort}_${sidebardata.order}`}
                id="sort_order"
                className="border border-slate-300 rounded-xl p-3 text-xs font-medium bg-white focus:outline-none focus:border-brandOrange-500"
              >
                <option value="regularPrice_asc">Rent / Price: Low to High (₹)</option>
                <option value="regularPrice_desc">Rent / Price: High to Low (₹)</option>
                <option value="createdAt_desc">Latest Added</option>
                <option value="createdAt_asc">Oldest Added</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-navy-900 hover:bg-navy-800 text-white font-bold p-3.5 rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md shadow-navy-900/20 text-sm flex items-center justify-center gap-2 mt-2"
            >
              <FaSearch className="text-xs text-brandOrange-400" />
              <span>Apply Filters</span>
            </button>
          </form>
        </div>
      </div>

      {/* Results Main Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-navy-900">
              Properties in Kolhapur
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Showing available verified homes and flats
            </p>
          </div>
          {!loading && (
            <span className="bg-brandOrange-50 text-brandOrange-700 font-bold text-xs px-3 py-1.5 rounded-full border border-brandOrange-200">
              {listings.length} {listings.length === 1 ? 'Property Found' : 'Properties Found'}
            </span>
          )}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && listings.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
              <MdLocationOn className="text-5xl text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-navy-900">No properties found in this location</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for another locality in Kolhapur like Rajarampuri, Tarabai Park, or clear some filter options.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 bg-brandOrange-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-brandOrange-600 transition-colors"
              >
                View All Kolhapur Listings
              </button>
            </div>
          )}

          {loading && (
            <div className="col-span-full py-20 text-center">
              <div className="w-10 h-10 border-4 border-brandOrange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm font-semibold text-slate-600">
                Finding homes in Kolhapur...
              </p>
            </div>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>

        {showMore && (
          <div className="text-center mt-10">
            <button
              className="bg-white hover:bg-slate-50 text-navy-900 border border-slate-300 font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow"
              onClick={onShowMoreClick}
            >
              Load More Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
