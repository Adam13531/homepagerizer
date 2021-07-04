import { saveAs } from "file-saver";
import { useSelector, useDispatch } from "react-redux";
import { setHomepageTitle, selectHomepageTitle } from "../state/contentSlice";
import { setShowImportDialog } from "../state/editingSlice";
import useHomepageState from "../hooks/useHomepageState";
import generateHtml from "../misc/generateHtml";

export default function HeaderControls({}) {
  const dispatch = useDispatch();
  const homepageTitle = useSelector(selectHomepageTitle);
  const homepageState = useHomepageState();

  const onSave = () => {
    const srcDoc = generateHtml(homepageState, { showEditButton: true });
    const blob = new Blob([srcDoc], {
      type: "text/html;charset=utf-8",
    });
    saveAs(blob, "homepage.html");
  };

  return (
    <>
      <div className="flex justify-between mb-1">
        <input
          type="text"
          className="border-b-2 border-indigo-300 py-3 px-4 w-72 text-indigo-900 text-2xl"
          placeholder={"Title your homepage"}
          value={homepageTitle}
          onChange={(e) => {
            dispatch(setHomepageTitle(e.target.value));
          }}
        />
        <button
          onClick={onSave}
          className="bg-indigo-700 text-white rounded py-3 px-4"
        >
          <i class="las la-arrow-circle-down"></i> Save & Download
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(setShowImportDialog(true));
          }}
          className="text-indigo-900"
        >
          <i class="las la-file-upload"></i>
        </button>
      </div>
    </>
  );
}
