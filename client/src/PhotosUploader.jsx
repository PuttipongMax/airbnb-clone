import { FaCloudUploadAlt } from "react-icons/fa";
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
       className="w-full h-[180px] flex"
       key={Date.now()+link}>
        <img src={'http://localhost:4000/uploads/'+link} 
         className="object-cover w-full h-full rounded-2xl"
        />
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
