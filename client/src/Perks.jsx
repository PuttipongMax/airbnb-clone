import { MdPets } from "react-icons/md";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { FaRadio } from "react-icons/fa6";
import { 
 FaWifi, 
 FaTruck, 
 FaTv
} from "react-icons/fa";

export default function Perks({ selected, onChange }){
 const handleCbClick = (e) => {
  e.preventDefault()
  const { checked, name } = e.target;
  if(checked){
     onChange([...selected, name])
  }
  else{
     onChange([...selected.filter(selectedName => selectedName !== name)])
  }
 }

 return (
  <div className="grid grid-cols-2 md:grid-cols-3 
       lg:grid-cols-6 gap-2 mt-2">
       <label className="border p-4 flex rounded-2xl gap-2 items-center 
       cursor-pointer">
        <input type="checkbox" checked={selected.includes('wifi')} onChange={handleCbClick} />
        <FaWifi />
        <span>Wifi</span>
       </label>
       <label className="border p-4 flex rounded-2xl gap-2 items-center 
       cursor-pointer">       
        <input type="checkbox" checked={selected.includes('parking')} onChange={handleCbClick} />
        <FaTruck />
        <span>Free parking spot</span>
       </label>
       <label className="border p-4 flex rounded-2xl gap-2 items-center
       cursor-pointer">
        <input type="checkbox" checked={selected.includes('tv')} onChange={handleCbClick} />
        <FaTv />
        <span>TV</span>
       </label>
       <label className="border p-4 flex rounded-2xl gap-2 items-center
       cursor-pointer">
        <input type="checkbox" checked={selected.includes('radio')} onChange={handleCbClick} />
        <FaRadio />
        <span>Radio</span>
       </label>
       <label className="border p-4 flex rounded-2xl gap-2 items-center
       cursor-pointer">
        <input type="checkbox" checked={selected.includes('pets')} onChange={handleCbClick} />
        <MdPets />
        <span>Pets</span>
       </label>
       <label className="border p-4 flex rounded-2xl gap-2 items-center
       cursor-pointer">
        <input type="checkbox" checked={selected.includes('entrance')} onChange={handleCbClick} />
        <BsBoxArrowInLeft className="w-6 h-6" />
        <span>Private entrance</span>
       </label>
      </div>
 )
}