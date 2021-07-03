import Rows from "../components/Rows";
import HTMLDropzone from "../components/HTMLDropzone";
import { ToastContainer } from "react-toastify";
import useKeyboardListener from "../hooks/useKeyboardListener";
import useUrlEffects from "../hooks/useUrlEffects";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ColorPickers from "../components/ColorPickers";
import Preview from "../components/Preview";
import EditItemModal from "../components/EditItemModal";

export default function App() {
  useUrlEffects();
  useKeyboardListener();

  return (
    <main>
      <HTMLDropzone />
      <DndProvider backend={HTML5Backend}>
        <Rows />
        <ColorPickers />
        <Preview />
        <EditItemModal />
        <ToastContainer
          position="top-left"
          autoClose={5000}
          closeOnClick
          pauseOnHover
        />
      </DndProvider>
    </main>
  );
}
