import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MdEditDocument, MdCloudUpload } from 'react-icons/md';

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 15000,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, [params.listingId]);

  const handleImagesSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);

      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError('Image upload failed (2MB max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload up to 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image.');
      if (formData.offer && +formData.regularPrice <= +formData.discountPrice)
        return setError('Discount price must be lower than regular price');

      setLoading(true);
      setError(false);

      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-4 sm:p-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-brandOrange-50 text-brandOrange-600 flex items-center justify-center text-2xl">
            <MdEditDocument />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Update Property Listing
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit property details for RentNest Kolhapur
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Form Details */}
          <div className="flex flex-col gap-4 flex-1">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block">
                Property Title / Name:
              </label>
              <input
                type="text"
                placeholder="e.g. Modern 2 BHK Flat — Tarabai Park"
                className="border border-slate-300 rounded-xl p-3.5 text-sm w-full focus:outline-none focus:border-brandOrange-500"
                id="name"
                maxLength="70"
                minLength="10"
                required
                onChange={handleChange}
                value={formData.name}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block">
                Description:
              </label>
              <textarea
                placeholder="Describe rooms, amenities, nearby areas in Kolhapur..."
                className="border border-slate-300 rounded-xl p-3.5 text-sm w-full focus:outline-none focus:border-brandOrange-500 min-h-[100px]"
                id="description"
                required
                onChange={handleChange}
                value={formData.description}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block">
                Address & Locality:
              </label>
              <input
                type="text"
                placeholder="e.g. Near Circuit House, Tarabai Park, Kolhapur"
                className="border border-slate-300 rounded-xl p-3.5 text-sm w-full focus:outline-none focus:border-brandOrange-500"
                id="address"
                required
                onChange={handleChange}
                value={formData.address}
              />
            </div>

            {/* Checkboxes: Type & Amenities */}
            <div className="flex gap-3 flex-wrap pt-2">
              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="rent"
                  className="accent-brandOrange-500 w-4 h-4 rounded"
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                />
                <span className="text-xs font-semibold text-slate-700">For Rent</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="sale"
                  className="accent-brandOrange-500 w-4 h-4 rounded"
                  onChange={handleChange}
                  checked={formData.type === 'sale'}
                />
                <span className="text-xs font-semibold text-slate-700">For Sale</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="parking"
                  className="accent-brandOrange-500 w-4 h-4 rounded"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span className="text-xs font-semibold text-slate-700">Parking Spot</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="furnished"
                  className="accent-brandOrange-500 w-4 h-4 rounded"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span className="text-xs font-semibold text-slate-700">Furnished</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="offer"
                  className="accent-brandOrange-500 w-4 h-4 rounded"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span className="text-xs font-semibold text-slate-700">Special Discount</span>
              </label>
            </div>

            {/* Numeric Inputs: Beds, Baths, Prices */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-600">Bedrooms:</label>
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brandOrange-500"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-600">Bathrooms:</label>
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brandOrange-500"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-600">
                  {formData.type === 'rent' ? 'Monthly Rent (₹):' : 'Total Price (₹):'}
                </label>
                <input
                  type="number"
                  id="regularPrice"
                  min="500"
                  max="100000000"
                  required
                  className="p-3 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-brandOrange-500"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
              </div>

              {formData.offer && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600">
                    Discounted Rent/Price (₹):
                  </label>
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="100000000"
                    required
                    className="p-3 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-brandOrange-500"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Images & Submission */}
          <div className="flex flex-col flex-1 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block">
                Property Photos:
              </label>
              <p className="text-xs text-slate-500 mb-3">
                The first photo will be the main card cover (maximum 6 photos).
              </p>

              <div className="flex gap-3">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="p-3 border border-slate-300 rounded-xl w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-navy-900 file:text-white hover:file:bg-navy-800"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleImagesSubmit}
                  className="px-5 py-2.5 bg-brandOrange-500 hover:bg-brandOrange-600 text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0"
                >
                  <MdCloudUpload className="text-base" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>

            {imageUploadError && (
              <p className="text-red-600 text-xs font-semibold">{imageUploadError}</p>
            )}

            {formData.imageUrls && formData.imageUrls.length > 0 && (
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between p-2.5 border border-slate-200 rounded-xl items-center bg-slate-50"
                  >
                    <img
                      src={url}
                      alt="listing thumbnail"
                      className="w-16 h-14 object-cover rounded-lg"
                    />
                    <span className="text-xs text-slate-500 font-medium">
                      Photo #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="text-xs text-red-600 hover:text-red-700 font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              disabled={loading || uploading}
              className="mt-4 p-4 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-2xl uppercase tracking-wider transition-all duration-200 shadow-md shadow-navy-900/20 text-sm disabled:opacity-60"
            >
              {loading ? 'Updating Listing...' : 'Save & Update Listing'}
            </button>
            {error && <p className="text-red-600 text-xs font-semibold text-center">{error}</p>}
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateListing;
