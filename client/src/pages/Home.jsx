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
    <div className='flex flex-wrap'>
      {/* Content */}
      <div className='w-full lg:w-1/2 p-6'>
        <div className='max-w-lg mx-auto'>
          <h1 className='text-4xl lg:text-6xl font-bold text-gray-900'>
            Find your next <span className='text-blue-500'>perfect</span> Drive In Minutes...
          </h1>
          <p className='mt-4 text-gray-600'>
            Pseudo Owner is the best place to find your next perfect car to Drive.
            We have a wide range of Cars for you to choose from.
          </p>
          <Link
            to={'/search'}
            className='inline-block mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600'
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Animation */}
      <div className='w-full lg:w-1/2 p-6'>
        <div id="your-animation-container"></div>
      </div>

      {/* Listing results for offer */}
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
