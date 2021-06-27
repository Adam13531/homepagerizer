import ColorPickerPopup from "./ColorPickerPopup";
import {
  setBgColor,
  setTextColor,
  setLinkColor,
  setAccentColor,
  setHoverColor,
} from "../misc/action_creators";

export default function ColorPickers({ state, dispatch }) {
  return (
    <div className="space-x-2">
      <ColorPickerPopup
        color={state.bgColor}
        text="Background color"
        onChange={(color) => {
          dispatch(setBgColor(color.hex));
        }}
      />
      <ColorPickerPopup
        color={state.linkColor}
        text="Link color"
        onChange={(color) => {
          dispatch(setLinkColor(color.hex));
        }}
      />
      <ColorPickerPopup
        color={state.textColor}
        text="Text color"
        onChange={(color) => {
          dispatch(setTextColor(color.hex));
        }}
      />
      <ColorPickerPopup
        color={state.accentColor}
        text="Accent color"
        onChange={(color) => {
          dispatch(setAccentColor(color.hex));
        }}
      />
      <ColorPickerPopup
        color={state.hoverColor}
        text="Hover color"
        onChange={(color) => {
          dispatch(setHoverColor(color.hex));
        }}
      />
    </div>
  );
}
