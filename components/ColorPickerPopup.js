import { useState } from "react";
import { SketchPicker } from "react-color";
import { isColorBright } from "../misc/util";
import Button, { ButtonThemes } from "./Button";

export default function ColorPickerPopup({ onChange, color, text }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  const buttonStyle = {
    backgroundColor: color,
    color: isColorBright(color) ? "black" : "white",
  };

  return (
    <span>
      <div className="text-indigo-900 mb-2">{text}</div>
      <div className="flex">
        <input
          type="text"
          className="border rounded-l border-indigo-300 py-3 px-4 w-32 text-indigo-900"
          placeholder={text}
          value={color}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <Button
          style={buttonStyle}
          theme={ButtonThemes.COLOR_PICKER}
          onClick={handleClick}
        >
          <i className="las la-fill-drip text-lg"></i>
        </Button>
      </div>
      {displayColorPicker && (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <SketchPicker
            presetColors={[]}
            disableAlpha={true}
            color={color}
            onChange={({ hex }) => {
              onChange(hex);
            }}
          />
        </div>
      )}
    </span>
  );
}
