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
    <div className="space-x-4 flex flex-wrap gap-y-2">
      <ColorPickerPopup
        color={bgColor}
        text="Background Color"
        onChange={(hex) => {
          dispatch(setBgColor(hex));
        }}
      />
      <ColorPickerPopup
        color={textColor}
        text="Text Color"
        onChange={(hex) => {
          dispatch(setTextColor(hex));
        }}
      />
      <ColorPickerPopup
        color={linkColor}
        text="Link Color"
        onChange={(hex) => {
          dispatch(setLinkColor(hex));
        }}
      />
      <ColorPickerPopup
        color={hoverColor}
        text="Link Hover Color"
        onChange={(hex) => {
          dispatch(setHoverColor(hex));
        }}
      />
      <ColorPickerPopup
        color={accentColor}
        text="Hotkey Color"
        onChange={(hex) => {
          dispatch(setAccentColor(hex));
        }}
      />
    </div>
  );
}
