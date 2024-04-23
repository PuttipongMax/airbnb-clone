import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from 'axios';
import PlacesPage from "./PlacesPage";
import { FaRegUser, FaListUl } from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";

export default function AccountPage(){
 const { ready, user, setUser } = useContext(UserContext);
 let { subpage } = useParams();
 const [redirect, setRedirect] = useState(null);

 async function logout(){
  await axios.post('/logout'); 
  setRedirect('/')
  setUser(null)
 }

 if(!ready){
  return 'Loading...';
 }

 if(subpage === undefined){
  subpage = 'profile';
 }

 if(ready && !user && !redirect){
  return <Navigate to={'/login'} />
 }

 function linkClasses(type=null){
  let classes = 'py-2 px-6 inline-flex gap-1 items-center'
  if(type === subpage  || (subpage === undefined && type === 'profile')){
   classes += ' bg-primary text-white rounded-full';
  }
  else{
   classes += 'bg-gray-200';
  }
  return classes;
 }

 if(redirect){
  return <Navigate to={redirect} />
 }

 return (
  <div>
   <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
    <Link to={'/account/profile'}
    className={linkClasses('profile')}
    >
     <FaRegUser />
     My Profile
    </Link>
    <Link to={'/account/bookings'}
    className={linkClasses('bookings')}
    >
     <FaListUl />
     My bookings
    </Link>
    <Link to={'/account/places'}
    className={linkClasses('places')}
    >
     <FaBuildingColumns /> 
     My accommodation
    </Link>
   </nav>
   {
    subpage === 'profile' && (
     <div className="text-center max-w-lg mx-auto">
      Logged in as {user.name} ({user.email})<br />
      <button 
      onClick={logout}
      className="primary max-w-sm mt-2">Logout</button>
     </div>
    )
   }
   {subpage === 'places' && (
    <PlacesPage />
   )}
  </div>
 )
}