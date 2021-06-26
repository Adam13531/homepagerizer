import Tooltip from "rc-tooltip";
import { useState } from "react";
import { deleteItem, updateItem, addItemBefore } from "../misc/action_creators";

export default function RowItem({ item, itemNum, rowNum, dispatch }) {
  const { text, url, keyboardShortcut } = item;
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

  const updateValues = () => {
    dispatch(
      updateItem(rowNum, itemNum, {
        text: inputText,
        url: inputUrl,
        keyboardShortcut: inputKeyboardShortcut,
      })
    );
  };

  const keyboardShortcutText = _.isNil(keyboardShortcut)
    ? "(unset)"
    : keyboardShortcut;

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
            setLocallyListeningforHotkey(!listeningForHotkey);
            setListeningForHotkey(!listeningForHotkey);
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
