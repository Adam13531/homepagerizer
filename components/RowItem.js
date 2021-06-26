import Tooltip from "rc-tooltip";
import { useState, useEffect } from "react";
import {
  deleteItem,
  updateItem,
  addItemBefore,
  setItemIdListeningForHotkey,
  setLastPressedHotkey,
} from "../misc/action_creators";

export default function RowItem({ item, itemNum, rowNum, dispatch }) {
  const { text, url, keyboardShortcut, id } = item;
  const { lastPressedHotkey } = state;
  const [inputUrl, setInputUrl] = useState(url);
  const [inputText, setInputText] = useState(text);
  const [inputKeyboardShortcut, setInputKeyboardShortcut] = useState(
    item.keyboardShortcut
  );

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      updateValues();
    }
  };

  const updateValues = (shortcutOverride = inputKeyboardShortcut) => {
    dispatch(
      updateItem(rowNum, itemNum, {
        text: inputText,
        url: inputUrl,
        keyboardShortcut: shortcutOverride,
      })
    );
  };

  let keyboardShortcutText = _.isNil(keyboardShortcut)
    ? "(unset)"
    : keyboardShortcut;

  const isThisItemListeningForHotkey = state.itemIdListeningForHotkey === id;

  if (isThisItemListeningForHotkey) {
    keyboardShortcutText = "Listening...";
  }

  useEffect(() => {
    if (_.isNil(lastPressedHotkey) || !isThisItemListeningForHotkey) {
      return;
    }

    // Backspace clears the hotkey
    const realHotkey =
      lastPressedHotkey === "Backspace" ? null : lastPressedHotkey;

    // Clear the last-pressed hotkey and the item requesting that hotkey.
    dispatch(setItemIdListeningForHotkey(null));
    dispatch(setLastPressedHotkey(null));

    setInputKeyboardShortcut(realHotkey);
    updateValues(realHotkey);
  }, [lastPressedHotkey, isThisItemListeningForHotkey]);

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
        <button
          className="border-2"
          onClick={() => {
            dispatch(
              setItemIdListeningForHotkey(
                isThisItemListeningForHotkey ? null : id
              )
            );
          }}
        >
          {keyboardShortcutText}
        </button>
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
