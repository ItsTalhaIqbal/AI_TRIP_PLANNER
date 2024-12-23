import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/services/FirebaseConfig';
import { Button } from '@/components/ui/button';

const TripHistory = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(userTrips);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    try {
      const userString = localStorage.getItem("User");
      if (!userString) {
        navigate('/'); // Navigate to home if no user
        return;
      }

      const user = JSON.parse(userString);
      if (!user?.email) {
        navigate('/'); // Navigate to home if email is not available
        return;
      }

      const q = query(collection(db, "AITrips"), where("userEmail", "==", user.email));
      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });

      setUserTrips(trips);
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError("Failed to fetch trips. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Trips</h2>
      {loading ? (
        <p>Loading trips...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : userTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userTrips.map((trip) => (
            <div key={trip.id} className="border rounded-lg overflow-hidden shadow-md">
              <img
                src={"/public/alter.webp"} // Placeholder image
                alt={trip.tripData.travelPlan.destination || "Trip"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{trip.tripData.travelPlan.destination || "Unknown Location"}</h3>
                <p className="text-sm text-gray-600">Days: {trip.tripData.travelPlan.duration || "N/A"}</p>
                <p className="text-sm text-gray-600">Budget: {trip.tripData.travelPlan.budget || "N/A"}</p>
                <Button
                  className="mt-3 w-full text-white py-2 rounded-lg"
                  onClick={() => navigate(`/view-trip/${trip.id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No trips found. Start planning your next adventure!</p>
      )}
    </div>
  );
};

export default TripHistory;
