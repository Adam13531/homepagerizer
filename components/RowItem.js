import Tooltip from "rc-tooltip";
import { useState } from "react";
import KeyboardShortcutButton from "./KeyboardShortcutButton";
import useDragAndDropItem from "../hooks/useDragAndDropItem";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { updateItem, addItemBefore } from "../state/contentSlice";
import { deleteItem } from "../state/actions";
import Checkbox from "rc-checkbox";

export default function RowItem({ item, itemNum, rowNum, isSmallText }) {
  const dispatch = useDispatch();

  const { text, url, keyboardShortcut, id } = item;
  const [inputIsSmallText, setInputIsSmallText] = useState(isSmallText);
  const [inputUrl, setInputUrl] = useState(url);
  const [inputText, setInputText] = useState(text);

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      updateValues();
    }
  };

  const updateValues = (shortcutOverride = keyboardShortcut) => {
    dispatch(
      updateItem(rowNum, itemNum, {
        text: inputText,
        url: inputUrl,
        isSmallText: inputIsSmallText,
        keyboardShortcut: shortcutOverride,
      })
    );
  };

  const updateKeyboardShortcut = (newShortcut) => {
    updateValues(newShortcut);
  };

  const [attachBothDragAndDropRefs, isDraggingAnywhere, isDraggingOver] =
    useDragAndDropItem(itemNum, rowNum);

  const tooltipOverlay = (
    <div className="flex flex-col">
      <div>
        URL:
        <input
          type="url"
          className="text-blue-600"
          placeholder="Link address"
          value={inputUrl}
          onKeyPress={handleSubmit}
          onChange={(e) => setInputUrl(e.target.value)}
        />
      </div>
      <div>
        Text:
        <input
          type="text"
          className="text-green-600"
          placeholder="Link text"
          value={inputText}
          onKeyPress={handleSubmit}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        Keyboard shortcut:{" "}
        <KeyboardShortcutButton
          item={item}
          onUpdateKeyboardShortcut={updateKeyboardShortcut}
        />
      </div>
      <div>
        <label>
          <Checkbox
            checked={inputIsSmallText}
            onChange={(e) => {
              setInputIsSmallText(e.target.checked);
            }}
          />
          Small text
        </label>
      </div>
      <div>
        <button onClick={() => updateValues()}>Update</button>
      </div>
      <div>
        <button onClick={() => dispatch(deleteItem(rowNum, itemNum, id))}>
          ❌ Delete
        </button>
      </div>
    </div>
  );

  const itemCss = classNames({
    "text-blue-500": true,
    "cursor-pointer": true,
    "border-2": isDraggingOver,
  });

  return (
    <span className="space-x-2">
      <button onClick={() => dispatch(addItemBefore(rowNum, itemNum))}>
        ➕
      </button>
      <Tooltip
        placement={"bottom"}
        mouseLeaveDelay={0.2}
        overlayInnerStyle={isDraggingAnywhere ? { display: "none" } : {}}
        overlay={tooltipOverlay}
        align={{
          offset: [0, 0],
        }}
        transitionName=""
      >
        <span ref={attachBothDragAndDropRefs} className={itemCss}>
          {text}
        </span>
      </Tooltip>
    </span>
  );
}
