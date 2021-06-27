import ColorPickerPopup from "./ColorPickerPopup";
import { useSelector, useDispatch } from "react-redux";

import {
  setBgColor,
  setTextColor,
  setLinkColor,
  setAccentColor,
  setHoverColor,
  selectAllColors,
} from "../state/colorsSlice";

export default function ColorPickers({}) {
  const { bgColor, textColor, linkColor, accentColor, hoverColor } =
    useSelector(selectAllColors);

  const dispatch = useDispatch();

  return (
    <div className="space-x-2">
      <ColorPickerPopup
        color={bgColor}
        text="Background color"
        onChange={(color) => {
          dispatch(setBgColor(color.hex));
        }}
      />
      <ColorPickerPopup
        color={linkColor}
        text="Link color"
        onChange={(color) => {
          dispatch(setLinkColor(color.hex));
        }}
      />
      <ColorPickerPopup
        color={textColor}
        text="Text color"
        onChange={(color) => {
          dispatch(setTextColor(color.hex));
        }}
      />
      <ColorPickerPopup
        color={accentColor}
        text="Accent color"
        onChange={(color) => {
          dispatch(setAccentColor(color.hex));
        }}
      />
      <ColorPickerPopup
        color={hoverColor}
        text="Hover color"
        onChange={(color) => {
          dispatch(setHoverColor(color.hex));
        }}
      />
    </div>
  );
}
