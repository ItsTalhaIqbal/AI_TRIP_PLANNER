import React from 'react';

const DailyPlans = ({ trip }) => {
    console.log("Data", trip);

    if (!trip?.tripData?.travelPlan?.itinerary) {
        return <p>No travel plan available.</p>;
    }

    // Sort the itinerary by day in ascending order, assuming days are numeric strings like "1", "2", "3"
    const sortedItinerary = Object.entries(trip.tripData.travelPlan.itinerary).sort(([dayA], [dayB]) => {
        return parseInt(dayA) - parseInt(dayB); // Sort by numeric value of the day
    });

    return (
        <div className='mt-10'>
            <h2 className='text-4xl font-semibold text-center'>Places to Visit</h2>
            <div className='mt-5'>
                {sortedItinerary.map(([day, data]) => (
                    <div key={day} className="mb-6">
                        <h3 className='font-bold text-xl mb-2'>
                            {`Day ${day}`} - {data.theme || "No Theme"}
                        </h3>
                        <p className='italic'>Best Time: {String(data.bestTime || "N/A")}</p>
                        <div className="mt-4 space-y-4">
                            {data.locations.map((location, index) => (
                                <div 
                                    key={index} 
                                    className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer" 
                                    onClick={() => window.open(`https://www.google.com/maps/search/?q=${location.name}`, '_blank')}
                                >
                                    <h4 className='font-semibold text-lg'>{location.name || "Unknown Location"}</h4>
                                    <p>{location.details || "No Details Provided"}</p>
                                    {location.image && (
                                        <img
                                            src={'/public/alter.webp'}
                                            alt={location.name}
                                            className="mt-2 w-full h-48 object-cover rounded-md"
                                        />
                                    )}
                                    <p className='text-sm mt-2'>
                                        <strong>Ticket Pricing:</strong> {String(location.ticketPricing || "Not Available")}
                                    </p>
                                    <p className='text-sm'>
                                        <strong>Travel Time:</strong> {String(location.travelTime || "Not Provided")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DailyPlans;
