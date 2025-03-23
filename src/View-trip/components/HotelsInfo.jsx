import React from 'react';
import { Link } from 'react-router-dom';

const HotelsInfo = ({ trip }) => {

    return (
        <div>
            <h2 className='font-semibold text-xl mt-5'>Hotels Recommendations</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3'>
                {
                    trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
                        <Link 
                            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ' ' + hotel.area)}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className='bg-white p-4 rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer'
                        >
                            <img src="/public/alter.webp" alt="alter" className='rounded-xl w-full h-40 object-cover' />
                            <div className='mt-3'>
                                <h2 className='text-sm font-medium'>{hotel.name}</h2>
                                <h2 className='text-xs text-gray-500'>📍 {hotel.area}</h2>
                                <h2 className='text-xs font-medium'>💰 {hotel.price.min}$ - {hotel.price.max}$</h2>
                                <h2 className='text-xs font-medium'>⭐ {hotel.rating} Stars</h2>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default HotelsInfo;
