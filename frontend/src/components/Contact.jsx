import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 mt-4">
          <p className="text-sm text-slate-700">
            Contact Landlord: <span className="font-bold text-navy-900">{landlord.username}</span> for{' '}
            <span className="font-semibold text-brandOrange-600">&ldquo;{listing.name}&rdquo;</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={onChange}
            placeholder="Write your inquiry or question for the property owner..."
            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:border-brandOrange-500 bg-white"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Inquiry regarding ${listing.name}&body=${encodeURIComponent(message)}`}
            className="bg-brandOrange-500 hover:bg-brandOrange-600 text-white font-semibold text-center p-3 uppercase rounded-xl transition-all shadow-md shadow-brandOrange-500/20 text-sm"
          >
            Send Inquiry Email
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
