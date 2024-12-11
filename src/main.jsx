import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css'
import App from './App.jsx'
import Navbar from './components/custom/Navbar';
import Create_trip from './create_trip';
import View_Trip from './View-trip/[tripId]';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <Create_trip />
  },
  {
    path: "/view-trip/:id",
    element: <View_Trip />
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode >
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Navbar />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
