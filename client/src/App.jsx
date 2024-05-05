import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import CreateListing from "./pages/CreateListing";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import MProfile from "./pages/MProfile";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UpdateListing from "./pages/UpdateListing";



export default function App() {
  return <BrowserRouter>
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<Search />} />
      <Route path="/listing/:listingId" element={<Listing />} />
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/mprofile' element={<MProfile />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/update-listing/:listingId' element={<UpdateListing />} />

      </Route>

    </Routes>
    <Footer />
  </BrowserRouter>
}
