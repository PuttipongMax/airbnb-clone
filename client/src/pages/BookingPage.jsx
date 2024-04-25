import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import BookingDates from "../BookingDates";
import PlaceGallery from "../PlaceGallery";

export default function BookingPage(){
 const {id} = useParams();
 const [booking, setBooking] = useState(null);

 useEffect(() => {
  if(id){
   axios.get('/bookings').then((response) => {
    const foundBooking = response.data.find(({ _id }) => {
     return _id === id
    });
    if(foundBooking){
     setBooking(foundBooking);
    }
   });
  }
 }, [id]);

 if(!booking){
  return '';
 }

 return (
  <div className="my-8">
   <h1 className="text-3xl">{booking.place.title}</h1>
   <AddressLink place={booking.place.address} className={`text-lg`} />
   <div className="flex justify-between bg-gray-200 
    p-4 mb-4 mt-6 rounded-2xl">
    <div>
     <h2 className="text-xl mb-2">Your booking information:&nbsp;</h2>
     <BookingDates booking={booking} />
    </div>
    <div className="flex flex-col justify-around items-center
     bg-primary p-4 text-white rounded-2xl">
     <div>Total price</div>
     <div className="text-3xl">{booking.price}</div>
    </div>
   </div>
   <PlaceGallery place={booking.place} />
  </div>
 )
}
