import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import lottie from 'lottie-web';
import animationData from '../assets/a1.json';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  useEffect(() => {
    const container = document.getElementById('your-animation-container');
    lottie.loadAnimation({
      container: container,
      renderer: 'svg', 
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }, []);

  return (
    <div className="bg-gray-100 ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section - Animation */}
        <div className="md:order-2">
          <div id="your-animation-container"></div>
        </div>
        
        {/* Right Section - Content */}
        <div className="md:order-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find your next <span className="text-blue-600">perfect</span> drive in minutes...
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Pseudo Owner is the best place to find your next perfect car to drive.
            We have a wide range of cars for you to choose from.
          </p>
          <Link
            to="/search"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-bold text-base rounded-full hover:bg-blue-700 transition duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>

      {/* listing results for offer */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
