import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa';

const ListingItem = ({ listing }) => {
  const displayPrice = listing.offer && listing.discountPrice > 0
    ? listing.discountPrice
    : listing.regularPrice;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden w-full sm:w-[330px] flex flex-col group">
      <Link to={`/listing/${listing._id}`} className="flex flex-col h-full">
        {/* Image Container with Badges */}
        <div className="relative overflow-hidden h-[220px] w-full bg-slate-100">
          <img
            src={
              listing.imageUrls && listing.imageUrls[0]
                ? listing.imageUrls[0]
                : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80'
            }
            alt={listing.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm ${
                listing.type === 'rent' ? 'bg-navy-900' : 'bg-emerald-600'
              }`}
            >
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
            {listing.offer && (
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brandOrange-500 text-white shadow-sm">
                Special Offer
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
          <div>
            <h3 className="text-base font-bold text-navy-900 group-hover:text-brandOrange-600 transition-colors line-clamp-1">
              {listing.name}
            </h3>

            <div className="flex items-center gap-1 mt-1 text-slate-500">
              <MdLocationOn className="h-4 w-4 text-brandOrange-500 flex-shrink-0" />
              <p className="text-xs text-slate-600 truncate font-medium">
                {listing.address}
              </p>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Price & Amenities */}
          <div className="pt-2 border-t border-slate-100 mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-navy-900">
                ₹{Number(displayPrice).toLocaleString('en-IN')}
              </span>
              {listing.type === 'rent' && (
                <span className="text-xs text-slate-500 font-medium">/ month</span>
              )}
              {listing.offer && listing.discountPrice > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{Number(listing.regularPrice).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-slate-600 text-xs font-semibold mt-3 pt-2 border-t border-slate-50">
              <div className="flex items-center gap-1">
                <FaBed className="text-brandOrange-500 text-sm" />
                <span>{listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaBath className="text-brandOrange-500 text-sm" />
                <span>{listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
              </div>
              {listing.parking && (
                <div className="flex items-center gap-1" title="Parking available">
                  <FaParking className="text-navy-700 text-sm" />
                  <span>Parking</span>
                </div>
              )}
              {listing.furnished && (
                <div className="flex items-center gap-1" title="Furnished">
                  <FaChair className="text-navy-700 text-sm" />
                  <span>Furnished</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
