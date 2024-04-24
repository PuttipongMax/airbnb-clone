import { 
  FaCloudUploadAlt, 
  FaTrashAlt, 
  FaStar, FaRegStar 
} from "react-icons/fa";

import axios from "axios";
import React, { useState } from "react";

export default function PhotosUploader({ addedPhotos, onChange }){
 const [photoLink, setPhotoLink] = useState('');

 async function addPhotoByLink(e){
  e.preventDefault();
  const { data:filename } = await axios.post('/upload-by-link', {link: photoLink})
  onChange(prev => {
    return [...prev, filename];
  });
  setPhotoLink('');
 }

 function uploadPhotos(e){
  const files = e.target.files;
  const data = new FormData();
  for(let i=0; i < files.length; i++){
    data.append('photos', files[i]); 
  }
  axios.post('/upload', data, {
    headers: {'Content-type': 'multipart/form-data'}
  }).then(response => {
    const { data:filenames } = response;
    onChange(prev => {
      return [...prev, ...filenames];
    });
  })
 }

 function removePhoto(e, filename){
  e.preventDefault();
  onChange([...addedPhotos.filter(photo => photo !== filename)]);
 }

 function selectAsMainPhoto(e, filename){
  e.preventDefault();
  const addedPhotosWithoutSelected = addedPhotos.filter(
    (photo) => (photo !== filename)
  );
  const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
  onChange(newAddedPhotos);
 }

 return (
  <>
   <div className="flex gap-2">
    <input type="text" value={photoLink}
     onChange={(e) => setPhotoLink(e.target.value)}
     placeholder='Add using a link ...jpg' />
    <button 
     onClick={addPhotoByLink}
     className="bg-gray-200 px-4 rounded-2xl">
      Add&nbsp;photo
    </button>
    </div>
     <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:gird-cols-6">
      {addedPhotos.length > 0 && addedPhotos.map((link) => (
      <div 
       className="w-full h-[180px] flex relative"
       key={Date.now()+link}>
        <img src={'http://localhost:4000/uploads/'+link} 
         className="object-cover w-full h-full rounded-2xl"
        />
        <button
        onClick={(e) => removePhoto(e, link)} 
        className="absolute bottom-1 right-1 p-1
          text-white hover:text-red-500 bg-black 
          cursor-pointer opacity-80 rounded-lg hover:bg-white">
          <FaTrashAlt className="w-6 h-6" />
        </button>
        <button
        onClick={(e) => selectAsMainPhoto(e, link)}
        className="absolute bottom-1 left-1 p-1
          text-white hover:text-indigo-500 bg-black 
          cursor-pointer opacity-80 rounded-lg hover:bg-white">
          {link === addedPhotos[0] && (
            <FaStar className="w-6 h-6" />
          )}
          {link !== addedPhotos[0] && (
            <FaRegStar className="w-6 h-6" />
          )}
        </button>
      </div>
      ))}
      <label 
       className="flex items-center border bg-transparent p-2 gap-1
        text-2xl text-gray-600 justify-center cursor-pointer 
        rounded-2xl "
      >
       <input type="file" className="hidden"
        onChange={uploadPhotos} multiple />
       <FaCloudUploadAlt className="h-8 w-8" />
        Upload 
      </label>
   </div> 
  </>
 )
}
