import { Button } from '@/components/ui/button';
import { prompt } from '@/constants/Promt';
import { chatSession } from '@/services/AImodel';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import Logo from '@/components/custom/Logo';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/FirebaseConfig'; // Ensure this file has Firebase config

const CreateTrip = () => {
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [travelWith, setTravelWith] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Get User Data using Google OAuth
  const getUserData = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    })
      .then((resp) => {
        localStorage.setItem("User", JSON.stringify(resp.data)); // Store user in localStorage
        setOpenDialog(false);
        setError('');
        generatePlan();
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to retrieve user data. Please try again.");
      });
  };

  const login = useGoogleLogin({
    onSuccess: (response) => getUserData(response),
    onError: (error) => console.error(error),
  });

  // Function to generate the trip plan
  const generatePlan = async () => {
    if (!location || !days || !budget || !travelWith || isNaN(days) || days <= 0) {
      setError('Please fill in all the travel details correctly!');
      return;
    }

    const user = localStorage.getItem("User");
    if (!user) {
      setOpenDialog(true); // If no user, prompt for login
      return;
    }

    const finalPrompt = prompt
      .replace("{location}", location)
      .replace("{days}", days)
      .replace("{travelwith}", travelWith)
      .replace("{budget}", budget);

    setLoading(true);
    try {
      const result = await chatSession.sendMessage(finalPrompt); // Send the prompt to AI for generating a plan
       saveGeneratedData(result?.response?.text());
      resetForm();
    } catch (error) {
      console.error("Error generating plan:", error);
      setError("Failed to generate the plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to save generated data to Firebase Firestore
  const saveGeneratedData = async (tripData) => {
    const formData = { location, days, budget, travelWith };
    const docId = Date.now().toString(); // Unique document ID based on the timestamp
    const user = JSON.parse(localStorage.getItem("User"));

    try {
      // Ensure the Firestore instance is correctly initialized
      const docRef = doc(db, "AITrips", docId);
      await setDoc(docRef, {
        userSelection: formData,
        tripData:JSON.parse(tripData),
        userEmail: user?.email,
        id: docId,
      });
      console.log("Data added successfully to Firestore");
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      setError("Failed to save your trip data. Please try again.");
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setLocation('');
    setDays(0);
    setBudget('');
    setTravelWith('');
  };

  return (
    <div className="max-w-[1300px] mx-auto px-6 mt-10">
      <div>
        <h2 className="text-5xl font-semibold">Tell us your preferences</h2>
        <p className="text-xl mt-4 text-gray-600">
          Provide some basic information, and our trip planner will generate a customized itinerary
          <br /> based on your preferences.
        </p>
      </div>

      <div className="mt-16 flex flex-col items-start space-y-10">
        {error && <p className="text-red-500 font-semibold">{error}</p>}

        {/* Destination Input */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-2">What is your destination of choice?</h2>
          <input
            className="h-12 w-full max-w-md px-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Punjab, Pakistan"
          />
        </div>

        {/* Days Input */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-2">How many days are you planning your trip?</h2>
          <input
            className="h-12 w-full max-w-md px-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="e.g., 7 days"
          />
        </div>

        {/* Budget Selection */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">What is your budget plan?</h2>
          <div className="flex space-x-4">
            {['low', 'medium', 'high'].map((b) => (
              <div
                key={b}
                className={`cursor-pointer px-6 py-3 border rounded-md text-center ${budget === b ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                onClick={() => setBudget(b)}
              >
                <p className="flex flex-col text-start">
                  <span className="text-xl font-semibold capitalize">{b}</span>
                  {b === 'low' ? '(0-1000 USD)' : b === 'medium' ? '(1000-2500 USD)' : '(2500+ USD)'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel With Selection */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Who do you plan to travel with?</h2>
          <div className="flex space-x-4">
            {['Just Me', 'family', 'friends', 'couple'].map((t) => (
              <div
                key={t}
                className={`cursor-pointer px-6 py-3 border rounded-md text-center ${travelWith === t ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                onClick={() => setTravelWith(t)}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full max-w-md">
          <Button onClick={generatePlan} disabled={loading} className="h-12">
            {loading ? 'Generating...' : 'Generate Plan'}
          </Button>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
       
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please Sign In</DialogTitle>
            <DialogDescription>
              <p>Please sign in to continue with Ocean</p>
              <Button className="w-full mt-5 flex gap-3">
                <FcGoogle className="w-10 h-10" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>

  );
};

export default CreateTrip;
