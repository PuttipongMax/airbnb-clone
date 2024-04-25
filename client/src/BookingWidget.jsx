import React, { useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function BookingWidget({ place }){
 const [checkIn, setCheckIn] = useState('');
 const [checkOut, setCheckOut] = useState('');
 const [numberOfGuests, setNumberOfGuests] = useState(1);
 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
 const [redirect, setRedirect] = useState('');

 let numberOfNights = 0;
 if(checkIn && checkOut){
  numberOfNights = differenceInCalendarDays(
   new Date(checkOut), new Date(checkIn)
  );
 }

 async function bookThisPlace(){
  const response = await axios.post('/bookings', { 
   checkIn, checkOut, numberOfGuests, name, phone,
   place: place._id,
   price: numberOfNights * place.price,
  });
  const bookingId = response.data._id;
  setRedirect(`/account/bookings/${bookingId}`)
 }

 if(redirect){
  return <Navigate to={redirect} />
 }

 return (
         <div className="bg-white shadow p-4 rounded-2xl">
          <div className="text-2xl text-center">
            Price:&nbsp;${place.price} / per night
          </div>   
          <div className="border rounded-2xl">
            <div className="grid grid-cols-2">
              <div className="py-3 px-4">
                <label>Check-in:&nbsp;</label>  
                <input type="date" value={checkIn}         
                onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>    
              <div className="py-3 px-4 border-l">
                <label>Check-out:&nbsp;</label>
                <input type="date" value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>     
            </div>
            <div className="py-3 px-4 border-l">
              <label>Number of guests:&nbsp;</label>
              <input type="number" value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)} 
              />
            </div>
            {numberOfNights > 0 && (
             <div className="py-3 px-4 border-t">
              <label>Your full name:&nbsp;</label>
              <input type="text" value={name}
              placeholder="What is your name"
              onChange={(e) => setName(e.target.value)}
              />
              <label>Phone number:&nbsp;</label>
              <input type="tel" value={phone}
              placeholder="Your phone number"
              onChange={(e) => setPhone(e.target.value)} 
              />
             </div>
            )}
          </div>
          <button 
          onClick={bookThisPlace}
          className="primary">
            Book this place
            {numberOfNights > 0 && (
             <span>&nbsp;${numberOfNights * place.price}</span>
            )}
          </button>      
         </div>
 )
}
