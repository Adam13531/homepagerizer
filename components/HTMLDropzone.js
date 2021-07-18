import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { loadSavedState } from "../state/actions";
import { parseHtml } from "../misc/parseHtml";
import { useDispatch, useSelector } from "react-redux";
import Button, { ButtonThemes } from "./Button";
import Modal from "react-modal";
import {
  selectIsImportDialogOpen,
  setShowImportDialog,
} from "../state/editingSlice";

export default function HTMLDropzone({}) {
  const [isDragging, setIsDragging] = useState(false);
  const isImportDialogOpen = useSelector(selectIsImportDialogOpen);

  const dispatch = useDispatch();
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

  const closeModal = () => {
    setIsDragging(false);
    dispatch(setShowImportDialog(false));
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: ["text/html"],
    multiple: false,
    onDrop: (acceptedFiles) => {
      closeModal();

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

  const dropzoneCss = classNames({
    dropzone: true,
    "border-2 border-dashed border-indigo-300 rounded-2xl self-stretch mb-4": true,
    "shadow-xl bg-indigo-200": isDragActive,
  });

  return (
    <Modal
      isOpen={isDragging || isImportDialogOpen}
      onRequestClose={closeModal}
      contentLabel="Import homepage"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center"
      className="bg-white outline-none rounded-lg shadow-xl transform transition-all my-8 align-middle max-w-lg w-full "
    >
      <div>
        <input {...getInputProps()} />
        <div className="outline-none bg-white rounded-lg py-6 px-8 text-indigo-900 flex flex-col items-center gap-y-2">
          <div className="text-2xl font-bold">Import Homepage</div>
          <div className="text-indigo-500 mb-6">
            Upload your homepage .HTML file
          </div>
          <div {...getRootProps({ className: dropzoneCss })}>
            <div className="flex flex-col items-center py-16 px-16">
              <i className="las la-file-code text-4xl"></i>
              <div>Drop file or click to select here</div>
            </div>
          </div>
          <div className="flex justify-end self-stretch gap-x-4">
            <Button onClick={closeModal} theme={ButtonThemes.LIGHT_INDIGO}>
              Cancel
            </Button>
            <Button onClick={open} theme={ButtonThemes.LIGHT_INDIGO}>
              Import
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
