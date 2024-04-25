export default function PlaceImg({ place, index=0, className }){
 if(!place.photos?.length){
  return '';
 }
 if(!className){
  className = 'object-cover'
 }

 return ( 
   <img 
   src={'http://localhost:4000/uploads/'+place.photos[index]} 
   alt="" 
   className="w-full h-full duration-200 object-cover
    transition-transform group-hover:scale-105 "
   />
 )
}
