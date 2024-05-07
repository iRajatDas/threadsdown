"use client";
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const Page = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      multiple: false,
      onDrop,
    });

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">Form Photo Editor</h1>
      <p className="mt-2 text-barcelona-secondary-text">
        Free Online form photo editor and resizer for all online application
        forms. Now, resize and compress your photo and signature easily. you can
        adjust width and height in pixel, centimeter, millimeter and inch
        according to dpi and you can also adjust dpi and maximum file size limit
        in kb and mb after select file.
      </p>

      <section
        className={cn(
          "mt-10 rounded border-4 border-dashed text-center transition-colors duration-300 ease-in-out",
          isDragActive ? "border-white" : "",
          isDragReject ? "border-red-500" : ""
        )}
      >
        <div {...getRootProps({ className: " px-4 py-12" })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              {isDragReject ? (
                <>
                  <p className="text-red-500">Only image files are allowed</p>
                </>
              ) : (
                <p>Drop the files here ...</p>
              )}
            </>
          ) : (
            // eslint-disable-next-line react/no-unescaped-entities
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
