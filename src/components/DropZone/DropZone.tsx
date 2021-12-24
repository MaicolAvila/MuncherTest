import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "../../styles/styles";

export default function DropZone({
  listOfUrlOrFiles = [],
  allowedTypes = [],
  maxFiles = 3,
  maxFileSize = 1024,
  changeImagen = (files: any) => {},
}) {
  const [fileError, setFileError] = useState<string | undefined>(undefined);

  const [Imagen, setImagen] = useState<File>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log("entro");
      console.log(acceptedFiles);
      setFileError("");

      const filesToAdd: File[] = [];
      for (let file of acceptedFiles) {
        console.log("al bucle entro ?");

        filesToAdd.push(file);
      }

      const listOfUrlOrFilesCopy: any = [...listOfUrlOrFiles];

      filesToAdd.forEach((fileToAdd) => {
        if (listOfUrlOrFilesCopy.length < maxFiles) {
          listOfUrlOrFilesCopy.push(fileToAdd);
        }
      });

      changeImagen(listOfUrlOrFilesCopy);
    },
    [listOfUrlOrFiles, allowedTypes, maxFileSize, maxFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <Label>
          Arrastra {maxFiles} imagenes aqui, o as click para seleccionarlas
        </Label>
      )}
    </div>
  );
}
