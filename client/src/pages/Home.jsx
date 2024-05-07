import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import lottie from 'lottie-web';
import animationData from '../assets/a1.json';
import ListingItem from '../components/ListingItem';

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
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();

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
    <div className="container mx-auto py-10 flex flex-wrap">
      {/* Introduction Section */}
      <section className="w-full md:w-2/3 px-4 mb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Find your next <span className="text-blue-500">perfect</span> Drive In Minutes...
          </h1>
          <p className="text-gray-600 mt-4 text-lg md:text-xl">Pseudo Owner is the best place to find your next perfect car to drive. We have a wide range of cars for you to choose from.</p>
          <Link to="/search" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
            Let's get started...
          </Link>
        </div>

        {/* Recent Offers Section */}
        <section className="mt-16">
          {offerListings.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">Recent Offers</h2>
              <Link to="/search?offer=true" className="text-blue-500 text-lg mb-6 inline-block hover:underline">Show more offers</Link>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offerListings.map(listing => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </section>
      </section>

      {/* Animation */}
      <div className="w-full md:w-1/3 px-4">
        <div id="your-animation-container" className="mx-auto max-w-lg"></div>
      </div>
    </div>
  );
}
