// components/FileDropzone.jsx
import React from "react";
import { useDropzone } from "react-dropzone";

const FileDropzone = ({
  onDrop,
  accept = { "image/*": [] },
  maxFiles = 5,
  multiple = true,
  className = "",
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 rounded text-center ${className}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag 'n' drop files here, or click to select</p>
      )}
    </div>
  );
};

export default FileDropzone;


//example usage

/**
 * 
 * <FileDropzone
      onDrop={handleDrop}
      accept={{ "image/*": [] }}
      maxFiles={1}
    />
 * 
 */
