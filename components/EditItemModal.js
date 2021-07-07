import Modal from "react-modal";
import _ from "lodash";
import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEditingItem } from "../state/editingSlice";
import { selectEditingItem } from "../state/editingSlice";
import { updateItem, selectItem } from "../state/contentSlice";
import { deleteItem } from "../state/actions";
import KeyboardShortcutButton from "./KeyboardShortcutButton";
import { setIsListeningForHotkey } from "../state/keyboardSlice";
import Checkbox from "rc-checkbox";
import { defaultIfBlankStr } from "../misc/util";

export default function EditItemModal() {
  const { rowNum, itemNum } = useSelector(selectEditingItem);
  const item = useSelector(selectItem(rowNum, itemNum));
  if (_.isNil(item)) {
    return null;
  }

  return <EditItemModalContent item={item} rowNum={rowNum} itemNum={itemNum} />;
}

/**
 * This is a layer of indirection from EditItemModal for a couple of reasons:
 * 1. This component doesn't have to worry about "item" being null.
 * 2. This component mounts once for each item, so useState can have the proper
 *    initial values.
 */
function EditItemModalContent({ item, rowNum, itemNum }) {
  const dispatch = useDispatch();

  const { text, url, id, isSmallText, keyboardShortcut } = item;
  const [inputText, setInputText] = useState(text);
  const [inputUrl, setInputUrl] = useState(url);
  const [inputIsSmallText, setInputIsSmallText] = useState(isSmallText);
  const [inputKeyboardShortcut, setInputKeyboardShortcut] =
    useState(keyboardShortcut);

  const inputRef = useCallback((node) => {
    if (!_.isNil(node)) {
      node.select();
    }
  }, []);

  const closeModal = () => {
    // Closing this dialog means you're no longer listening for a hotkey since
    // it's the only way to edit hotkeys.
    dispatch(setIsListeningForHotkey(false));
    dispatch(setEditingItem(null, null));
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      onSave();
    }
  };

  const onSave = () => {
    dispatch(
      updateItem(rowNum, itemNum, {
        text: defaultIfBlankStr(inputText, "New item"),

        // If we allow a URL to contain only spaces, then clicking it will do
        // nothing.
        url: defaultIfBlankStr(inputUrl, ""),
        isSmallText: inputIsSmallText,
        keyboardShortcut: inputKeyboardShortcut,
      })
    );
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Edit link properties"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center"
      className="bg-white outline-none rounded-lg shadow-xl transform transition-all my-8 align-middle max-w-lg w-full "
    >
      <div className="flex flex-col text-indigo-900 gap-y-2 px-6 py-8">
        <span className="mb-1">Link Text</span>
        <div>
          <input
            type="text"
            className="border rounded border-indigo-300 py-3 px-4 w-full"
            placeholder="Link text"
            autoFocus
            ref={inputRef}
            value={inputText}
            onKeyPress={handleSubmit}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
        </div>
        <span className="mb-1">URL</span>
        <div className="flex">
          <input
            type="url"
            className="border rounded border-indigo-300 py-3 px-2 w-full"
            placeholder="Link address"
            value={inputUrl}
            onKeyPress={handleSubmit}
            onChange={(e) => {
              setInputUrl(e.target.value);
            }}
          />
        </div>
        <div className="grid grid-rows-auto1f grid-cols-2 gap-y-3">
          <span>Keyboard Shortcut</span>
          <span>Small text</span>
          <div>
            <KeyboardShortcutButton
              keyboardShortcut={inputKeyboardShortcut}
              onChooseShortcut={setInputKeyboardShortcut}
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
            </label>
          </div>
          <div className="self-center">
            <button
              className="text-red-600"
              onClick={() => dispatch(deleteItem(rowNum, itemNum, id))}
            >
              <i className="lar la-trash-alt"></i> Delete Link
            </button>
          </div>
          <div className="flex space-x-4">
            <div>
              <button
                className="border border-indigo-300 rounded bg-indigo-50 py-3 px-4"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <button
              className="border border-indigo-700 text-white rounded bg-indigo-700 py-3 px-4"
              onClick={onSave}
            >
              Save Link
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
