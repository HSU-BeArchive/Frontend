import React from "react";
import { useDropzone } from "react-dropzone";

const UploadDropzone = ({ onFileSelect, children }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      onFileSelect(acceptedFiles[0]);
    },
  });

  return (
    <div {...getRootProps()} className="dropzone-wrapper">
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default UploadDropzone;
