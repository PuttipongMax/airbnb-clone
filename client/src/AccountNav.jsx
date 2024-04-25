import { Link, useLocation } from 'react-router-dom';
import { FaRegUser, FaListUl } from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";

export default function AccountNav(){
 const {pathname} = useLocation();
 let subpage = pathname.split('/')?.[2];
 if(subpage === 'profile'){
  subpage = 'profile';
 }

 function linkClasses(type=null){
  let classes = 'py-2 px-6 inline-flex'
  if(type === subpage){
   classes += ' bg-primary text-white rounded-full';
  }
  else{
   classes += 'bg-gray-200';
  }
  return classes;
 }
 
 // if(redirectToPlacesList && action !== 'new'){
 //  return <Navigate to={'/account/places'} />
 // }

 return (
  <nav className="w-full flex items-center justify-center mt-8 gap-2 mb-8">
    <Link to={'/account/profile'}
    className={`flex items-center gap-1 ${linkClasses('profile')}`}
    >
     <FaRegUser />
     My Profile
    </Link>
    <Link to={'/account/bookings'}
    className={`flex items-center gap-1 ${linkClasses('bookings')}`}
    >
     <FaListUl />
     My bookings
    </Link>
    <Link to={'/account/places'}
    className={`flex items-center gap-1 ${linkClasses('places')}`}
    >
     <FaBuildingColumns /> 
     My accommodation
    </Link>
   </nav>
 )
}