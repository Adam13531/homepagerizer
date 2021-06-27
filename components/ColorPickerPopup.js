import { useState } from "react";
import { SketchPicker } from "react-color";

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
  return (
    <span>
      <button onClick={handleClick}>{text}</button>
      {displayColorPicker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <SketchPicker
            presetColors={[]}
            disableAlpha={true}
            color={color}
            onChange={onChange}
          />
        </div>
      ) : null}
    </span>
  );
}
