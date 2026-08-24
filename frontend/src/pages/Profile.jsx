import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import { MdAddHome, MdPerson, MdListAlt, MdDelete, MdEdit, MdLocationOn } from 'react-icons/md';

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (err) {
      dispatch(signOutUserFailure(err.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (err) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-900 flex items-center justify-center text-2xl">
            <MdPerson />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Account Profile
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your personal details and Kolhapur rental listings
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="relative group cursor-pointer" onClick={() => fileRef.current.click()}>
              <img
                src={formData.avatar || currentUser.avatar}
                alt="profile avatar"
                className="rounded-full h-24 w-24 object-cover border-4 border-slate-100 shadow-md group-hover:opacity-80 transition-all"
              />
              <span className="absolute bottom-0 right-0 bg-brandOrange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                Edit
              </span>
            </div>
            <p className="text-xs">
              {fileUploadError ? (
                <span className="text-red-600 font-semibold">
                  Image upload failed (Must be less than 2MB)
                </span>
              ) : filePercentage > 0 && filePercentage < 100 ? (
                <span className="text-slate-600 font-semibold">{`Uploading ${filePercentage}%`}</span>
              ) : filePercentage === 100 ? (
                <span className="text-emerald-600 font-semibold">Image updated successfully!</span>
              ) : (
                <span className="text-slate-400">Click photo to change avatar</span>
              )}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Username:
            </label>
            <input
              type="text"
              placeholder="Username"
              className="border border-slate-300 rounded-xl p-3.5 text-sm focus:outline-none focus:border-brandOrange-500"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Email Address:
            </label>
            <input
              type="email"
              placeholder="Email address"
              className="border border-slate-300 rounded-xl p-3.5 text-sm focus:outline-none focus:border-brandOrange-500"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              New Password (Optional):
            </label>
            <input
              type="password"
              placeholder="Leave blank to keep existing password"
              className="border border-slate-300 rounded-xl p-3.5 text-sm focus:outline-none focus:border-brandOrange-500"
              id="password"
              onChange={handleChange}
            />
          </div>

          <button
            disabled={loading}
            className="bg-navy-900 hover:bg-navy-800 text-white font-bold p-3.5 rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md shadow-navy-900/20 text-sm disabled:opacity-60 mt-2"
          >
            {loading ? 'Saving Changes...' : 'Update Account Profile'}
          </button>

          <Link
            to="/create-listing"
            className="bg-brandOrange-500 hover:bg-brandOrange-600 text-white font-bold p-3.5 rounded-xl uppercase tracking-wider text-center transition-all duration-200 shadow-md shadow-brandOrange-500/20 text-sm flex items-center justify-center gap-2"
          >
            <MdAddHome className="text-lg" />
            <span>Create New Listing in Kolhapur</span>
          </Link>
        </form>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 text-xs">
          <button
            type="button"
            onClick={handleDeleteUser}
            className="text-red-600 hover:text-red-700 font-semibold cursor-pointer"
          >
            Delete Account
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-slate-600 hover:text-navy-900 font-semibold cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        {error && <p className="text-red-600 text-xs font-semibold mt-4 text-center">{error}</p>}
        {updateSuccess && (
          <p className="text-emerald-600 text-xs font-semibold mt-4 text-center">
            Profile details updated successfully!
          </p>
        )}

        {/* User Listings Management */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={handleShowListings}
            className="w-full bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold p-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <MdListAlt className="text-base text-brandOrange-500" />
            <span>View & Manage My Properties</span>
          </button>

          {showListingError && (
            <p className="text-red-600 text-xs mt-3 text-center font-semibold">
              Error fetching your listings. Please try again.
            </p>
          )}

          {userListings && userListings.length > 0 && (
            <div className="flex flex-col gap-3 mt-6">
              <h2 className="text-base font-bold text-navy-900">
                Your Properties ({userListings.length})
              </h2>

              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border border-slate-200 rounded-2xl p-3.5 flex justify-between items-center gap-4 bg-slate-50 hover:bg-white transition-all shadow-sm"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt={listing.name}
                      className="h-16 w-16 object-cover rounded-xl border border-slate-200"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/listing/${listing._id}`}
                      className="text-sm font-bold text-navy-900 hover:text-brandOrange-600 truncate block"
                    >
                      {listing.name}
                    </Link>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <MdLocationOn className="text-brandOrange-500 flex-shrink-0" />
                      <span className="truncate">{listing.address}</span>
                    </div>
                    <p className="text-xs font-extrabold text-navy-900 mt-1">
                      ₹{Number(listing.regularPrice).toLocaleString('en-IN')}
                      {listing.type === 'rent' && <span className="text-[10px] font-normal text-slate-500"> / mo</span>}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link to={`/update-listing/${listing._id}`}>
                      <button
                        title="Edit Property"
                        className="p-2 text-slate-700 hover:text-navy-900 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                      >
                        <MdEdit className="text-base" />
                      </button>
                    </Link>
                    <button
                      title="Delete Property"
                      onClick={() => handleListingDelete(listing._id)}
                      className="p-2 text-red-600 hover:text-red-700 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <MdDelete className="text-base" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
