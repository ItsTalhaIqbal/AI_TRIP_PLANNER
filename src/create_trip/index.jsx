import { Button } from "@/components/ui/button";
import { prompt } from "@/constants/Promt";
import { chatSession } from "@/services/AImodel";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import Logo from "@/components/custom/Logo";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelWith, setTravelWith] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const getUserData = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("User", JSON.stringify(resp.data));
        setOpenDialog(false);
        setError("");
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

  const generatePlan = async () => {
    if (!location || !days || !budget || !travelWith || isNaN(days) || days <= 0) {
      setError("Please fill in all the travel details correctly!");
      return;
    }

    const user = localStorage.getItem("User");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    const finalPrompt = prompt
      .replace("{location}", location)
      .replace("{days}", days)
      .replace("{travelwith}", travelWith)
      .replace("{budget}", budget);

    setLoading(true);
    try {
      const result = await chatSession.sendMessage(finalPrompt);
      saveGeneratedData(result?.response?.text());
    } catch (error) {
      console.error("Error generating plan:", error);
      setError("Failed to generate the plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveGeneratedData = async (tripData) => {
    const formData = { location, days, budget, travelWith };
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("User"));

    try {
      const docRef = doc(db, "AITrips", docId);
      await setDoc(docRef, {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userEmail: user?.email,
        id: docId,
      });
      navigate("/view-trip/" + docId);
      resetForm();
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      setError("Failed to save your trip data. Please try again.");
    }
  };

  const resetForm = () => {
    setLocation("");
    setDays(0);
    setBudget("");
    setTravelWith("");
  };

  return (
    <div className="max-w-[1300px] mx-auto px-6 mt-10">
      <div>
        <h2 className="text-5xl font-semibold text-center md:text-left">
          Tell us your preferences
        </h2>
        <p className="text-xl mt-4 text-gray-600 text-center md:text-left">
          Provide some basic information, and our trip planner will generate a
          customized itinerary based on your preferences.
        </p>
      </div>

      <div className="mt-16 flex flex-col items-start space-y-10">
        {error && <p className="text-red-500 font-semibold">{error}</p>}

        {/* Destination Input */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-2">What is your destination of choice?</h2>
          <input
            className="h-12 w-full px-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
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
            className="h-12 w-full px-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="e.g., 7 days"
          />
        </div>

        {/* Budget Selection */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">What is your budget plan?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Low 💰", value: "low" },
              { label: "Medium 💵", value: "medium" },
              { label: "High 💎", value: "high" },
            ].map(({ label, value }) => (
              <div
                key={value}
                className={`cursor-pointer px-6 py-5 border rounded-md text-center transition-all ${budget === value
                    ? "border-black bg-gray-100"
                    : "border-gray-300 bg-gray-50"
                  } hover:shadow-md`}
                onClick={() => setBudget(value)}
              >
                <p className="flex flex-col text-start">
                  <span className="text-xl font-semibold capitalize">{label}</span>
                  {value === "low"
                    ? "(0-1000 USD)"
                    : value === "medium"
                      ? "(1000-2500 USD)"
                      : "(2500+ USD)"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel With Selection */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">Who do you plan to travel with?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Just Me 🧍", value: "Just Me" },
              { label: "Family 👨‍👩‍👧‍👦", value: "family" },
              { label: "Friends 👯", value: "friends" },
              { label: "Couple 💑", value: "couple" },
            ].map(({ label, value }) => (
              <div
                key={value}
                className={`cursor-pointer px-6 py-5 border rounded-md text-center transition-all ${travelWith === value
                    ? "border-black bg-gray-100"
                    : "border-gray-300 bg-gray-50"
                  } hover:shadow-md`}
                onClick={() => setTravelWith(value)}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full max-w-md">
          <Button onClick={generatePlan} disabled={loading} className="h-12">
            {loading ? "Generating..." : "Generate Plan"}
          </Button>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please Sign In</DialogTitle>
            <DialogDescription>
              <span>Please sign in to continue with Ocean</span>
              <Button onClick={login} className="w-full mt-5 flex gap-3">
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
