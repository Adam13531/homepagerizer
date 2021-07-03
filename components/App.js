import HTMLDropzone from "../components/HTMLDropzone";
import { ToastContainer } from "react-toastify";
import useKeyboardListener from "../hooks/useKeyboardListener";
import useUrlEffects from "../hooks/useUrlEffects";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Preview from "../components/Preview";
import ToolSection from "../components/ToolSection";
import EditItemModal from "../components/EditItemModal";

export default function App() {
  useUrlEffects();
  useKeyboardListener();

  return (
    <main>
      <HTMLDropzone />
      <DndProvider backend={HTML5Backend}>
        <div className="w-4/5 mx-auto mt-4">
          <ToolSection />
          <Preview />
        </div>
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
