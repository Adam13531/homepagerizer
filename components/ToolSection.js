import Rows from "../components/Rows";
import ColorPickers from "../components/ColorPickers";
import FontPicker from "../components/FontPicker";
import HeaderControls from "../components/HeaderControls";

export default function ToolSection() {
  return (
    <>
      <HeaderControls />
      <div className="mb-4" />
      <Rows />
      <div className="mt-8 mb-4 text-indigo-900 text-2xl font-bold">
        Customize Design
      </div>
      <ColorPickers />
      <div className="mb-4" />
      <FontPicker />
    </>
  );
}
