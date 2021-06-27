import generateHtml from "../misc/generateHtml";
import { saveAs } from "file-saver";
import debounceRender from "react-debounce-render";
import { useSelector } from "react-redux";
import { selectAllColors } from "../state/colorsSlice";
import { selectRows, selectHomepagerizerAddress } from "../state/contentSlice";

function Preview() {
  const allColors = useSelector(selectAllColors);
  const rows = useSelector(selectRows);
  const homepagerizerAddress = useSelector(selectHomepagerizerAddress);
  const state = {
    rows,
    homepagerizerAddress,
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
