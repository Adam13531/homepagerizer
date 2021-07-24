import Rows from "../components/Rows";
import ColorPickers from "../components/ColorPickers";
import FontPicker from "../components/FontPicker";
import FontSpacings from "../components/FontSpacings";
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
      <div className="space-x-4 flex flex-wrap gap-y-2">
        <FontPicker />
        <FontSpacings />
      </div>
    </>
  );
}
