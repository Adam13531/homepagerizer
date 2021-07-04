import Rows from "../components/Rows";
import ColorPickers from "../components/ColorPickers";
import FontPicker from "../components/FontPicker";

export default function ToolSection() {
  return (
    <>
      <Rows />
      <div className="mt-16 mb-4 text-indigo-900 text-2xl font-bold">
        Customize Design
      </div>
      <ColorPickers />
      <div className="mb-4" />
      <FontPicker />
    </>
  );
}
