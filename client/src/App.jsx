import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import MProfile from "./pages/MProfile";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Footer from "./components/Footer";



export default function App() {
  return <BrowserRouter>
  <Header/>
 
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/About" element={<About/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="/listing/:listingId" element={<Listing/>}/>
    <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/mprofile' element={<MProfile />} />
          <Route path='/create-listing' element={<CreateListing />} /> 
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />

        </Route>
  
  </Routes>
 <Footer/>
  </BrowserRouter>
}
