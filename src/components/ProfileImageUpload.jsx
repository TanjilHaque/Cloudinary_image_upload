import React, { useState } from "react";
import Dropzone from "react-dropzone";
import FileDropzone from "./FIleDropzone";

const cloudinaryURL = "https://api.cloudinary.com/v1_1/dfchfmhre/upload";
const uploadPreset = 'cloudinaryTest';


const ProfileImageUpload = () => {
  const [imageURL, setImageURL] = useState(""); // will help to show the image in web
  const handleDrop = () => {
    console.log("file dropped");
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("uploadPreset", uploadPreset);
    try{
        const response = await fetch(cloudinaryURL,{
            method: "POST",
            body: formData
        })
        const data = await response.json();
        if(data.secure_url){
            setImageURL(data.secure_url);
        }
    }catch(err){
        console.log(err);
        
    }
    console.log("file Uploaded");
  };
  const handleRemove = () => {
    console.log("file removed");
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div
        className="imageBox w-[350px] h-[500px] border-2 border-dashed
       rounded-md flex items-center justify-center overflow-hidden"
      >
        {imageURL ? (
          <img src={imageURL} alt="image uploaded" />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <div>
        <FileDropzone
          onDrop={handleDrop}
          accept={{ "image/*": [] }}
          maxFiles={1}
        />
      </div>
      <div className="flex justify-center items-center gap-8">
        <button
          onClick={handleUpload}
          className="p-4 bg-green-500 cursor-pointer"
        >
          Upload Image
        </button>
        <button
          onClick={handleRemove}
          className="p-4 bg-red-500 cursor-pointer"
        >
          Remove Image
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
