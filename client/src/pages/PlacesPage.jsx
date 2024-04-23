import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import Perks from "../Perks";

export default function PlacesPage(){
 const {action} = useParams();
 const [title, setTitle] = useState('');
 const [address, setAddress] = useState('');
 const [addedPhotos, setAddedPhotos] = useState([]);
 const [photoLink, setPhotoLink] = useState('');
 const [description, setDescription] = useState('');
 const [perks, setPerks] = useState([]);
 const [extraInfo, setExtraInfo] = useState([]);
 const [checkIn, setCheckIn] = useState('');
 const [checkOut, setCheckOut] = useState('');
 const [maxGuests, setMaxGuests] = useState(1);

 function inputHeader(text){
  return (
   <h2 className="text-2xl mt-4">{text}</h2>
  );
 }

 function inputDescription(text){
  return (
   <p className="text-gray-500 text-sm">{text}</p>
  );
 }

 function preInput(header, description){
  return (
   <>
    {inputHeader(header)}
    {inputDescription(description)}
   </>
  );
 }

 return (
  <div>
   {action !== 'new' && (
    <div className="text-center">
    <Link
    to={'/account/places/new'}
    className="inline-flex bg-primary text-white 
     items-center rounded-full gap-1 py-2 px-6"
    >
     <FaPlus />
     Add new place
    </Link>
   </div>
   )}
   {action === 'new' && (
    <div className="w-full mx-auto px-4 sm:px-[4%]">
     <form>
      {preInput('Title', 'Title for your place. should be short and catch as in advertisment')}      
      <input type='text'        
       placeholder="title, for example: My lovely apt" 
      />
      {preInput('Address', 'Address to your place')}
      <input type='text'      
       placeholder="address"
      />

      <h2 className="text-2xl mt-4">Photos</h2>
      <p className="text-gray-500 text-sm">more = better</p>
      <div className="flex gap-2">
       <input type="text" placeholder='Add using a link ...jpg' />
       <button className="bg-gray-200 px-4 rounded-2xl">
        Add&nbsp;photo
       </button>
      </div>
      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:gird-cols-6">
       <button 
        className="flex border bg-transparent rounded-2xl p-8 
         text-2xl text-gray-600 justify-center gap-1"
       >
        <FaCloudUploadAlt className="h-8 w-8" />
        Upload 
       </button>
      </div> 
      <h2 className="text-2xl mt-4">Description</h2>
      <p className="text-gray-500 text-sm">description of the place</p>
      <textarea />  
      <h2 className="text-2xl mt-4">Perks</h2>
      <p className="text-gray-500 text-sm">
       select all the perks of your place
      </p> 
      <Perks selected={perks} onChange={setPerks} />
      <h2 className="text-2xl mt-4">Extra info</h2>
      <p className="text-gray-500 text-sm">
       house rules, etc
      </p>
      <textarea />
      <h2 className="text-2xl mt-4">Check in&out times</h2>
      <p className="text-gray-500 text-sm">
       add check in and out times, remember to have some time window
       for cleaning the room between guests
      </p>
      <div className="grid sm:grid-cols-3 gap-2">
       <div>
        <h3 className="mt-2 -mb-1">Check in time</h3>
        <input type="text" placeholder="14:00" />
       </div>
       <div>
        <h3 className="mt-2 -mb-1">Check out time</h3>
        <input type="text" />
       </div>
       <div>
        <h3 className="mt-2 -mb-1">Max number of guests</h3>
        <input type="text" />
       </div>
       <div className="">
        <button className="primary my-4">Save</button>
       </div>
      </div>
     </form>
    </div>
   )}
  </div>
 )
}