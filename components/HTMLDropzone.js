import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { loadSavedState } from "../misc/action_creators";
import { parseHtml } from "../misc/parseHtml";

export default function HTMLDropzone({ dispatch }) {
  const [isDragging, setIsDragging] = useState(false);

  const onImport = (str) => {
    dispatch(loadSavedState(parseHtml(str)));
  };

  useEffect(() => {
    const handleDragStart = (e) => {
      // Make sure the user is dragging a file (as opposed to dragging text).
      const types = _.get(e.dataTransfer, "types", []);
      if (_.includes(types, "Files")) {
        setIsDragging(true);
      }
    };

    window.addEventListener("dragenter", handleDragStart);

    return function cleanup() {
      window.removeEventListener("dragenter", handleDragStart);
    };
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ["text/html"],
    multiple: false,
    noClick: true,
    onDragLeave: () => {
      setIsDragging(false);
    },
    onDrop: (acceptedFiles) => {
      setIsDragging(false);
      acceptedFiles.forEach((file) => {
        console.log(`Reading ${file.name}`);

        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const str = reader.result;
          onImport(str);
        };
        reader.readAsText(file);
      });
    },
  });

  const extraCss = classNames({
    dropzone: true,
    invisible: !isDragging,
  });

  return (
    <div {...getRootProps({ className: extraCss })}>
      <input {...getInputProps()} />
      <div className="fixed h-full w-full flex items-center justify-center z-10 text-gray-100 bg-red-700 bg-opacity-70">
        Drag your existing homepage anywhere!
      </div>
    </div>
  );
}
