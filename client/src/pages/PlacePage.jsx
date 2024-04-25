import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdInsertPhoto, MdClose } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import BookingWidget from "../BookingWidget";

export default function PlacePage(){
 const { id } = useParams();
 const [place, setPlace] = useState(null);
 const [showAllPhotos, setShowAllPhotos] = useState(false);

 useEffect(() => {
  if(!id){
   return;
  }
  axios.get(`/places/${id}`).then((response) => {
   setPlace(response.data)
  })
 }, [id]);

 if(!place){
  return (
   <div className="mt-[20%] mx-auto text-4xl font-bold text-red-500">
    Not Found!!!
   </div>
  )
 }

 if(showAllPhotos){
  return (
   <div className={`absolute inset-0 text-white 
    min-h-screen`}>
    <div className="bg-black p-4 grid gap-4">
     <div>
      <h2 className="text-3xl mr-[40%]">Photos of {place.title}</h2>
      <button 
      onClick={() => setShowAllPhotos(false)}
      className="fixed flex items-center gap-1 p-2 px-4 
       shadow shadow-black bg-white text-black
       rounded-2xl right-4 top-4">
       <MdClose />
       Close photos
      </button>
     </div>
    {place?.photos?.length > 0 && place.photos.map((photo) => (
     <div 
     key={Date.now()+Math.random().toString()}
     className="">
      <img 
      src={'http://localhost:4000/uploads/'+photo} 
      alt=""
      className="object-cover w-full"
      />
     </div>
    ))}
    </div>
   </div>
  )
 }

 return (
  <div className="mt-4 bg-gray-100 px-4 py-6">
   <h1 className="text-3xl">
    {place.title}
   </h1> 
   <a 
   className="flex items-center gap-1 font-semibold underline my-2"
   target="_blank" href={`https://maps.google.com/?g=`+place.address}>
    <FaMapMarkerAlt />
    {place.address}
   </a>
   <div className="relative">
    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl 
     overflow-hidden">
    <div className="">
     {place.photos?.[0] && (
      <img 
      src={`http://localhost:4000/uploads/`+place.photos[0]} 
      className="aspect-square object-cover cursor-pointer"
      alt=""
      onClick={() => setShowAllPhotos(true)}
      />
     )}
    </div>
    <div className="grid">
     {place.photos?.[1] && (
      <img 
      className="aspect-square object-cover cursor-pointer"
      src={`http://localhost:4000/uploads/`+place.photos[1]} alt=""
      onClick={() => setShowAllPhotos(true)}
      />
     )}
     <div className="border border-gray-100 overflow-hidden">
      {place.photos?.[2] && (
       <img 
        className="aspect-square object-cover relative top-2 cursor-pointer"
        src={`http://localhost:4000/uploads/`+place.photos[2]} alt=""
        onClick={() => setShowAllPhotos(true)}
        />
      )}
      </div>
     </div>
    </div>
    <button 
    onClick={() => setShowAllPhotos(true)}
    className="flex gap-1 absolute bottom-2 right-2 py-2 px-4
     rounded-2xl bg-white shadow-md shadow-gray-400">
      <MdInsertPhoto className="w-6 h-6" />
      Show more photos
    </button>
   </div>
    
    <div className="mt-8 mb-4 gap-8 grid grid-cols-1 
      lg:grid-cols-[2fr_1fr]">
      <div>
        <div className="my-4">
          <h2 className="font-semibold">Description</h2>
          {place.description}
        </div>
        Check-in:&nbsp;{place.checkIn}<br />
        Check-out:&nbsp;{place.checkOut}<br />
        Max number of quests:&nbsp;{place.maxGuests}
      </div>
      <div>
        <BookingWidget place={place} />
      </div>
    </div>
    <div className="bg-white -mx-8 px-8 py-8 border-t">
      <div>
        <h2 className="font-semibold text-2xl">Extra info</h2>
      </div>
      <div className="mb-4 mt-2 text-sm text-gray-700 leading-4">
        {place.extraInfo}
      </div>
    </div>
    
  </div>
 )
}
