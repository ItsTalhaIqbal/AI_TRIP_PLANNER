import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Logo from "./Logo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("User"));
    setUser(storedUser);
  }, []);

  const getUserData = async (response) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
      );
      const data = await res.json();
      setUser(data);
      localStorage.setItem("User", JSON.stringify(data));
      setOpenDialog(false); // Close the dialog after successful login
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (response) => getUserData(response),
    onError: (error) => console.error("Login Failed:", error),
  });

  const handleLogout = () => {
    localStorage.removeItem("User");
    setUser(null);
  };

  return (
    <div className="max-w-[1300px] mx-auto">
      <nav className="flex justify-between items-center px-3 py-4 md:px-8">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <Logo />
        </a>

        {/* Navigation & Actions */}
        <div className="flex items-center space-x-4">
          {user?.picture ? (
            <div className="flex items-center space-x-4">
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full text-gray-500">
                  + Create Trip
                </Button>
              </a>
              <a href="/views/trip-history">
                <Button variant="outline" className="rounded-full">
                  My Trips
                </Button>
              </a>
              <Popover>
                <PopoverTrigger>
                  <img
                    src={user.picture}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </PopoverTrigger>
                <PopoverContent className="p-4">
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          )}
        </div>
      </nav>

      {/* Dialog for Sign-In */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please Sign In</DialogTitle>
            <DialogDescription>
              <span>Please sign in to continue with Ocean</span>
              <Button onClick={login} className="w-full mt-5 flex gap-3">
                <FcGoogle className="w-6 h-6" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
