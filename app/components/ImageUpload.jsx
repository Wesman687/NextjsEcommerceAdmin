"use client";
import { useState } from "react";
import { uploadImage } from '../queries/UploadImage'

export default function ImageUpload({ setImages }) {

  
   async function handleChange(e)  {
      
        const formData = new FormData();
        const file = e.target.files
        formData.append('file', file)
        const objectUrl = URL.createObjectURL(file);
        const res = await uploadImage({image: formData})
      
    }

  return (
    <>
      <label className="cursor-pointer w-24 h-24 flex items-center text-center justify-center gap-1 text-gray-500 rounded-md bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-center"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
        <div>Upload</div>
        
        <input type="file" onChange={(e)=>handleChange(e)} className="hidden" />
      </label>
    </>
  );
}
