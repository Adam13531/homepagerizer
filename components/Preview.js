import generateHtml from "../misc/generateHtml";
import { saveAs } from "file-saver";
import debounceRender from "react-debounce-render";
import { useSelector } from "react-redux";
import { selectAllColors } from "../state/colorsSlice";

function Preview({ state }) {
  // Currently, the state is split between Redux Toolkit and React, so we
  // combine it here.
  const allColors = useSelector(selectAllColors);
  state = {
    ...state,
    ...allColors,
  };

  const srcDoc = generateHtml(state, { showEditButton: false });
  const onSave = () => {
    const srcDoc = generateHtml(state, { showEditButton: true });
    const blob = new Blob([srcDoc], {
      type: "text/html;charset=utf-8",
    });
    saveAs(blob, "homepage.html");
  };

  return (
    <div>
      <button onClick={onSave}>Save</button>
      <div>Your homepage's preview:</div>
      <iframe srcDoc={srcDoc} />
    </div>
  );
}

export default debounceRender(Preview, 200, { maxWait: 500 });
