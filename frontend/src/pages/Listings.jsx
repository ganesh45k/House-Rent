import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaCheckCircle,
} from 'react-icons/fa';
import Contact from '../components/Contact';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="min-h-screen pb-16 bg-slate-50">
      {loading && (
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-4 border-brandOrange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-base font-semibold text-slate-600">Loading property details...</p>
        </div>
      )}
      {error && (
        <div className="py-24 text-center">
          <p className="text-xl font-bold text-red-600">Property not found or something went wrong!</p>
        </div>
      )}
      {listing && !loading && !error && (
        <div>
          {/* Swiper Gallery */}
          <div className="relative max-w-7xl mx-auto md:mt-6 md:rounded-3xl overflow-hidden shadow-lg">
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[360px] sm:h-[480px] lg:h-[550px] w-full"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Share Floating Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                aria-label="Share property link"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
                className="w-11 h-11 rounded-full bg-white/90 backdrop-blur text-navy-900 flex justify-center items-center shadow-lg hover:bg-white transition-all"
              >
                <FaShare className="text-sm text-slate-700" />
              </button>
            </div>

            {copied && (
              <div className="absolute top-16 right-4 z-10 rounded-xl bg-navy-900 text-white text-xs px-3 py-2 shadow-xl flex items-center gap-1.5 animate-fade-in">
                <FaCheckCircle className="text-emerald-400" /> Link copied to clipboard!
              </div>
            )}
          </div>

          {/* Details Card */}
          <div className="flex flex-col max-w-4xl mx-auto px-4 py-8 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-5">
              {/* Header Title & Price */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white ${
                        listing.type === 'rent' ? 'bg-navy-900' : 'bg-emerald-600'
                      }`}
                    >
                      {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                    {listing.offer && (
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brandOrange-500 text-white">
                        Special Offer
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                    {listing.name}
                  </h1>
                  <p className="flex items-center mt-2 gap-1.5 text-slate-600 text-sm font-medium">
                    <FaMapMarkerAlt className="text-brandOrange-500" />
                    {listing.address}
                  </p>
                </div>

                <div className="sm:text-right flex-shrink-0">
                  <div className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                    ₹{Number(listing.offer && listing.discountPrice > 0 ? listing.discountPrice : listing.regularPrice).toLocaleString('en-IN')}
                    {listing.type === 'rent' && (
                      <span className="text-sm font-medium text-slate-500"> / month</span>
                    )}
                  </div>
                  {listing.offer && listing.discountPrice > 0 && (
                    <div className="text-xs text-slate-400 line-through mt-1">
                      Original: ₹{Number(listing.regularPrice).toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-brandOrange-50 text-brandOrange-600 flex items-center justify-center">
                    <FaBed className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">Bedrooms</p>
                    <p className="text-sm font-bold text-navy-900">{listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-brandOrange-50 text-brandOrange-600 flex items-center justify-center">
                    <FaBath className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">Bathrooms</p>
                    <p className="text-sm font-bold text-navy-900">{listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center">
                    <FaParking className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">Parking</p>
                    <p className="text-sm font-bold text-navy-900">{listing.parking ? 'Available' : 'No Parking'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center">
                    <FaChair className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">Furnishing</p>
                    <p className="text-sm font-bold text-navy-900">{listing.furnished ? 'Furnished' : 'Unfurnished'}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-navy-900 mb-2">Property Description</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Contact Landlord Trigger */}
              {currentUser && listing.userRef !== currentUser._id && !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="bg-brandOrange-500 hover:bg-brandOrange-600 text-white font-bold rounded-2xl uppercase tracking-wider transition-all p-4 shadow-md shadow-brandOrange-500/20 text-sm mt-2"
                >
                  Contact Landlord
                </button>
              )}

              {contact && <Contact listing={listing} />}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
