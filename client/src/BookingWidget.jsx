export default function BookingWidget({ place }){


 return (
         <div className="bg-white shadow p-4 rounded-2xl">
          <div className="text-2xl text-center">
            Price:&nbsp;{place.price} / per night
          </div>   
          <div className="border rounded-2xl">
            <div className="grid grid-cols-2">
              <div className="py-3 px-4">
                <label>Check-in:&nbsp;</label>  
                <input type="date" />
              </div>    
              <div className="py-3 px-4 border-l">
                <label>Check-out:&nbsp;</label>
                <input type="date" />
              </div>     
            </div>
            <div className="py-3 px-4 border-l">
              <label>Number of guests:&nbsp;</label>
              <input type="number" value={1} />
            </div>
          </div>
          <button className="primary">
            Book this place
          </button>      
         </div>
 )
}
