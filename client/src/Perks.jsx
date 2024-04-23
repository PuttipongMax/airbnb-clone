import { MdPets } from "react-icons/md";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import { FaRadio } from "react-icons/fa6";
import { 
 FaWifi, 
 FaTruck, 
 FaTv
} from "react-icons/fa";

export default function Perks({ selected, onChange }){
 return (
  <div className="grid grid-cols-2 md:grid-cols-3 
       lg:grid-cols-6 gap-2 mt-2">
       <label className="border p-4 flex rounded-2xl gap-2 items-center 
       cursor-pointer">
        <input type="checkbox" />
        <FaWifi />
        <span>Wifi</span>
       </label>
       <label className="border p-4 flex rounded-2xl gap-2 items-center 
       cursor-pointer">       
        <input type="checkbox" />
        <FaTruck />
        <span>Free parking spot</span>
       </label>
       <label className="border p-4 flex rounded-2xl gap-2 items-center
       cursor-pointer">
        <input type="checkbox" />
        <FaTv />
        <span>TV</span>
       </label>
       <label className="border p-4 flex rounded-2xl gap-2 items-center
       cursor-pointer">
        <input type="checkBox" />
        <FaRadio />
        <span>Radio</span>
       </label>
       <label className="border p-4 flex rounded-2xl gap-2 items-center
       cursor-pointer">
        <input type="checkBox" />
        <MdPets />
        <span>Pets</span>
       </label>
       <label className="border p-4 flex rounded-2xl gap-2 items-center
       cursor-pointer">
        <input type="checkBox" />
        <HiArrowRightEndOnRectangle className="rotate-180 w-6 h-6" />
        <span>Private entrance</span>
       </label>
      </div>
 )
}