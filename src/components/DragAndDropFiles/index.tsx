import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Dropzone, UploadFile } from "./styles";

type Props = {
  uploadFiles: (files: File[] | FileList) => void;
};

const DragAndDrop = ({ uploadFiles }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    uploadFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
      },
      onDrop,
    });

  return (
    <Dropzone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <span>Drag & Drop Images</span>
      <span>or</span>
      <UploadFile>Upload a File</UploadFile>
    </Dropzone>
  );
};

export default DragAndDrop;
