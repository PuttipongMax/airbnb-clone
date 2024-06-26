import { FaAirbnb } from "react-icons/fa6";
import { FaSearch, FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Header(){
  const { user } = useContext(UserContext);
  return (
  <div className="">
      <header className='flex justify-between'>
        <Link
        to="/"
        className='flex items-center gap-1'>
          <FaAirbnb className='w-8 h-6' />
          <span className='font-bold text-xl'>
            airbnc
          </span>
        </Link>  

        <div className='sm:flex border border-gray-300 
          py-2 px-4 rounded-full gap-2 shadow-md
          shadow-gray-500 hidden'>
          <div>Anywhere</div>
          <div className='border-l border-gray-300' />
          <div>Any week</div>
          <div className='border-l border-gray-300' />
          <div>Add guests</div>
          <button className='bg-primary text-white p-1 rounded-full'>
            <FaSearch className='w-4 h-4' />  
          </button>  
        </div> 

        <Link to={user?'/account/profile':`/login`} className='flex items-center gap-2 border border-gray-300 
          py-2 px-4 rounded-full'>      
          <RxHamburgerMenu className='w-6 h-6' />
          <div className='bg-gray-500 text-white rounded-full
            border border-gray-500 overflow-hidden'>
            <FaUser className='w-6 h-6 relative top-1' />
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>

      </header>
    </div>
 )
}

