import Tooltip from "rc-tooltip";
import { useState } from "react";
import { deleteItem, updateItem, addItemBefore } from "../misc/action_creators";
import KeyboardShortcutButton from "./KeyboardShortcutButton";
import useDragAndDropItem from "../hooks/useDragAndDropItem";
import classNames from "classnames";

export default function RowItem({ item, itemNum, rowNum, state, dispatch }) {
  const { text, url, keyboardShortcut } = item;
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
        keyboardShortcut: shortcutOverride,
      })
    );
  };

  const updateKeyboardShortcut = (newShortcut) => {
    updateValues(newShortcut);
  };

  const [attachBothDragAndDropRefs, isDraggingAnywhere, isDraggingOver] =
    useDragAndDropItem(itemNum, rowNum, state, dispatch);

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
          state={state}
          dispatch={dispatch}
          item={item}
          onUpdateKeyboardShortcut={updateKeyboardShortcut}
        />
      </div>
      <div>
        <button onClick={() => updateValues()}>Update</button>
      </div>
      <div>
        <button onClick={() => dispatch(deleteItem(rowNum, itemNum))}>
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
