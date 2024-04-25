import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { FaCreditCard } from "react-icons/fa";
// import { differenceInCalendarDays, format } from "date-fns";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { MdNightsStay, MdOutlineAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage(){
 const [bookings, setBookings] = useState([]);

 useEffect(() => {
  axios.get('/bookings').then(response => {
   setBookings(response.data);
  })
 }, []);

 return (
  <div>
   <AccountNav />
   <div>
    {bookings?.length > 0 && bookings.map((booking) => (
     <Link
     to={`/account/bookings/${booking._id}`} 
     key={Math.random()}
     className="flex gap-4 bg-gray-200 flex-col md:flex-row
      rounded-2xl overflow-hidden"
     >
      <div className="h-[160px] shrink-0">
       <PlaceImg place={booking.place} />
      </div>
      <div className="grow-1 shrink pb-4 sm:py-4 mx-[4%] sm:mx-0">
       <h2 className="text-xl">{booking.place.title}</h2>
       {/* <div className="flex gap-2 border-t border-gray-300 
        mt-2 py-2 items-center">
         
       </div> */}
       <div className="text-xl flex flex-col gap-2">
        <BookingDates booking={booking} />
        <div className="flex items-center gap-1 text-xl">
          <FaCreditCard className="w-6 h-6" />
          <span className="text-2xl">
            Total price:&nbsp;${booking.price}
          </span>
        </div>
       </div>
      </div>
     </Link>
    ))}
   </div>
  </div>
 );
}