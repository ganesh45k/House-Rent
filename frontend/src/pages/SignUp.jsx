import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { MdHomeWork } from 'react-icons/md';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brandOrange-600 to-brandOrange-400 flex items-center justify-center text-white shadow-md shadow-brandOrange-500/20 mx-auto mb-3">
            <MdHomeWork className="text-2xl" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900">
            Join <span className="text-brandOrange-500">RentNest</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create your account to rent or list homes in Kolhapur
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 block">
              Username:
            </label>
            <input
              type="text"
              placeholder="e.g. rahul_patil"
              className="border border-slate-300 rounded-xl p-3.5 text-sm w-full focus:outline-none focus:border-brandOrange-500"
              id="username"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 block">
              Email Address:
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="border border-slate-300 rounded-xl p-3.5 text-sm w-full focus:outline-none focus:border-brandOrange-500"
              id="email"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 block">
              Password:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="border border-slate-300 rounded-xl p-3.5 text-sm w-full focus:outline-none focus:border-brandOrange-500"
              id="password"
              required
              onChange={handleChange}
            />
          </div>

          <button
            disabled={loading}
            className="bg-navy-900 hover:bg-navy-800 text-white font-bold p-3.5 rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md shadow-navy-900/20 text-sm disabled:opacity-60 mt-2"
          >
            {loading ? 'Creating Account...' : 'Create RentNest Account'}
          </button>

          <div className="flex items-center gap-3 my-1">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs text-slate-400 font-semibold uppercase">or</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <OAuth />
        </form>

        <div className="flex justify-center items-center gap-1.5 text-xs text-slate-600 mt-6 pt-6 border-t border-slate-100">
          <span>Already have an account?</span>
          <Link to="/sign-in" className="text-brandOrange-600 font-bold hover:underline">
            Sign In
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-medium p-3 rounded-xl mt-4 text-center border border-red-100">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
