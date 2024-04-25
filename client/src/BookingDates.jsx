import { differenceInCalendarDays, format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdNightsStay } from "react-icons/md";

export default function BookingDates({ booking }){
 return (
  <div className="flex items-center gap-1 mb-2 
         mt-4 text-gray-500 flex-col sm:flex-row">
          <div className="flex items-center flex-row">
           <MdNightsStay />
           {differenceInCalendarDays(
            new Date(booking.checkOut), 
            new Date(booking.checkIn)
           )}&nbsp;nights  
          </div> 
          <div className="flex items-center gap-1 ml-2">
            <FaRegCalendarAlt />
            {format(booking.checkIn, 'dd-MM-yyyy')} 
          </div> 
          <strong className="text-lg rotate-90 sm:rotate-0">&rarr;</strong>
          <div className="flex items-center gap-1">
            <FaRegCalendarAlt />
            {format(booking.checkOut, 'dd-MM-yyyy')}
          </div> 
        </div>
 )
}