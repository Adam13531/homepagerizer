import Tooltip from "rc-tooltip";
import { useState } from "react";
import {
  deleteItem,
  updateItem,
  addItemBefore,
  setItemIdListeningForHotkey,
} from "../misc/action_creators";
import KeyboardShortcutButton from "./KeyboardShortcutButton";

export default function RowItem({ item, itemNum, rowNum, dispatch }) {
  const { text, url, keyboardShortcut, id } = item;
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
        <button onClick={updateValues}>Update</button>
      </div>
      <div>
        <button onClick={() => dispatch(deleteItem(rowNum, itemNum))}>
          ❌ Delete
        </button>
      </div>
    </div>
  );

  return (
    <span className="space-x-2">
      <button onClick={() => dispatch(addItemBefore(rowNum, itemNum))}>
        ➕
      </button>
      <Tooltip
        placement={"bottom"}
        mouseLeaveDelay={0.2}
        overlay={tooltipOverlay}
        align={{
          offset: [0, 0],
        }}
        transitionName=""
      >
        <span className="text-blue-500 cursor-pointer">{text}</span>
      </Tooltip>
    </span>
  );
}
