import lottie from 'lottie-web';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import animationData from '../assets/a1.json';
import ListingItem from '../components/ListingItem';
// import { _fetchOfferListings } from '../http';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get?offer=true&limit=4`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });

        console.log(res);
        const data = await res.json();
        // const { data } = await _fetchOfferListings();
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
    <div >
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-600 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          Drive In Minutes...
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Pseudo Owner is the best place to find your next perfect car to Drive.
          <br />
          We have a wide range of Cars for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Book Now
        </Link>

      </div>
      <div id="your-animation-container" className=""></div>



      {/* listing results for offer */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='inline-block mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600'}>Show more offers</Link>
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
