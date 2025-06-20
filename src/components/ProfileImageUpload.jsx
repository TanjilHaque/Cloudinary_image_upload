import React, { useState, useEffect } from "react";
import FileDropzone from "./FIleDropzone";
import { db } from "../../Database/firebase.config";
import { push, ref, set, get } from "firebase/database";

const cloudinaryURL = "https://api.cloudinary.com/v1_1/dfchfmhre/upload";
const uploadPreset = "cloudinaryTest";

const ProfileImageUpload = () => {
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔁 Load last uploaded image from Firebase on mount
  useEffect(() => {
    const fetchLastImage = async () => {
      try {
        const snapshot = await get(ref(db, "lastUploadedImage"));
        if (snapshot.exists()) {
          const savedURL = snapshot.val();
          if (savedURL) {
            setImageURL(savedURL);
          }
        }
      } catch (err) {
        console.error("Error fetching image from Firebase:", err);
      }
    };
    fetchLastImage();
  }, []);

  // ⬇️ When file is dropped
  const handleDrop = (acceptedFiles) => {
    if (!loading && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  // ⬆️ Upload to Cloudinary and save URL to Firebase
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(cloudinaryURL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.secure_url) {
        setImageURL(data.secure_url);
        setFile(null);

        // 🔥 Save to Firebase (both history and current)
        await push(ref(db, "images"), {
          imageAddress: data.secure_url,
          uploadedAt: Date.now(),
        });

        await set(ref(db, "lastUploadedImage"), data.secure_url); // ✅ for reload
        alert("Image uploaded and saved to Firebase!");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Remove image from local state + Firebase
  const handleRemove = async () => {
    try {
      setImageURL("");
      setFile(null);
      await set(ref(db, "lastUploadedImage"), ""); // ❌ clear from Firebase too
      alert("Image removed.");
    } catch (err) {
      console.error("Error removing image:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-6 p-4 bg-gray-50">
      {/* 🖼️ Image Preview */}
      <div className="imageBox w-[350px] h-[350px] border-2 border-dashed rounded-md flex items-center justify-center overflow-hidden bg-white">
        {loading ? (
          <p className="text-blue-500 animate-pulse text-lg">Uploading...</p>
        ) : imageURL ? (
          <img src={imageURL} alt="Uploaded preview" className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* 📂 FileDropzone */}
      <FileDropzone
        onDrop={handleDrop}
        accept={{ "image/*": [] }}
        maxFiles={1}
        className={loading ? "pointer-events-none opacity-50" : ""}
      />

      {/* 🔘 Buttons */}
      <div className="flex gap-6">
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`px-6 py-2 rounded ${
            file && !loading
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        <button
          onClick={handleRemove}
          disabled={!imageURL || loading}
          className={`px-6 py-2 rounded ${
            imageURL && !loading
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {loading ? "..." : "Remove Image"}
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
