import { MdInsertPhoto } from "react-icons/md"
import { MdClose } from "react-icons/md";
import React, { useState } from 'react';

export default function PlaceGallery({ place }){
 const [showAllPhotos, setShowAllPhotos] = useState(false);

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
 )
}