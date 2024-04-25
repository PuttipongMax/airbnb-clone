import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function PlacesPage(){
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/user-places').then(({data}) => {
      setPlaces(data);
    });
  }, []);
 return (
  <div>
    <AccountNav />
    <div className="text-center">
      List of all added places
      <br />
    <Link
    to={'/account/places/new'}
    className="inline-flex bg-primary text-white 
     items-center rounded-full gap-1 py-2 px-6"
    >
     <FaPlus />
     Add new place
    </Link>
   </div>
   <div className="mt-4">
    {places.length > 0 && places.map((place, index) => (
      <Link
       to={'/account/places/'+place._id} 
       key={Date.now()+index}
       className="flex gap-4 bg-gray-100 p-4
        cursor-pointer flex-col md:flex-row"
      >
        <div className=" h-[250px] bg-gray-300 shrink-0 group">
          {place.photos.length > 0 && (
            <img src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" 
              className="w-full h-full object-cover duration-200
              transition-transform group-hover:scale-105 "
            />
          )}
        </div>
        <div className="grow-1 shrink">
          <h2>{place.title}</h2>
          <p>{place.description}</p>
        </div>
      </Link>
    ))}
   </div>
  </div>
 )
}