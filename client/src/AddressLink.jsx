import { FaMapMarkerAlt } from "react-icons/fa";

export default function AddressLink({ place, className }){
 if(!className){
  className = ' my-3 block';
 }
 className += ' mt-1 flex items-center gap-1 font-semibold underline';

 return (
  <a 
   className={className}
   target="_blank" 
   href={`https://maps.google.com/?g=`+place}>
    <FaMapMarkerAlt />
    {place}
  </a>
 )
}