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
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";



const Create_trip = () => {
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [travelWith, setTravelWith] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialoge] = useState(false)


  const generatePlan = async () => {

    const User = localStorage.getItem("User")
    if (!User) {
      setOpenDialoge(true)
      return;
    }

    if (!location || !days || !budget || !travelWith) {
      setError('Please fill in all the travel details!');
      return false;
    }
    const finalPrompt = prompt
      .replace("{location}", location)
      .replace("{days}", days)
      .replace("{travelwith}", travelWith)
      .replace("{budget}", budget)
      .replace("{days}", days)

    setLoading(true);
    console.log(finalPrompt);
    try {
      const result = await chatSession.sendMessage(finalPrompt);
      console.log(result?.response?.text())
      setLocation('');
      setDays('');
      setBudget('');
      setTravelWith('');
      setLoading(false);

    } catch (error) {
      console.log("error :", error);

    }

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
      <Dialog open={openDialog} onOpenChange={setOpenDialoge}>
        <DialogTrigger asChild>
        </DialogTrigger>
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

export default Create_trip;
