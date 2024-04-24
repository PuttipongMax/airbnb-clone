import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";

export default function PlacesPage(){
  useEffect(() => {
    
  }, [])
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
  </div>
 )
}