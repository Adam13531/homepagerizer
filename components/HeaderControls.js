import { saveAs } from "file-saver";
import { useSelector, useDispatch } from "react-redux";
import { setHomepageTitle, selectHomepageTitle } from "../state/contentSlice";
import { setShowImportDialog } from "../state/editingSlice";
import Button, { ButtonThemes } from "./Button";
import useHomepageState from "../hooks/useHomepageState";
import generateHtml from "../misc/generateHtml";
import Tooltip from "rc-tooltip";

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
        <Button onClick={onSave} theme={ButtonThemes.DARK_INDIGO}>
          <i className="las la-arrow-circle-down"></i> Save & Download
        </Button>
      </div>
      <div>
        <Tooltip
          placement="bottom"
          overlay={<span>Import existing homepage</span>}
        >
          <Button
            onClick={() => {
              dispatch(setShowImportDialog(true));
            }}
            theme={ButtonThemes.ICON}
          >
            <i className="las la-file-upload"></i>
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
