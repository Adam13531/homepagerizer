import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItemIdListeningForHotkey,
  selectLastPressedHotkey,
  setLastPressedHotkey,
  setItemIdListeningForHotkey,
} from "../state/keyboardSlice";
import { updateItem } from "../state/contentSlice";

/**
 * A button that knows how to listen to a keyboard shortcut and update the item
 * that this belongs to.
 */
export default function KeyboardShortcutButton({ item, rowNum, itemNum }) {
  const dispatch = useDispatch();

  const itemIdListeningForHotkey = useSelector(selectItemIdListeningForHotkey);
  const lastPressedHotkey = useSelector(selectLastPressedHotkey);
  const { keyboardShortcut, id } = item;
  const isThisItemListeningForHotkey = itemIdListeningForHotkey === id;

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

    dispatch(
      updateItem(rowNum, itemNum, {
        keyboardShortcut: realHotkey,
      })
    );
  }, [lastPressedHotkey, isThisItemListeningForHotkey]);

  let keyboardShortcutText = _.isNil(keyboardShortcut)
    ? "(unset)"
    : keyboardShortcut;

  if (isThisItemListeningForHotkey) {
    keyboardShortcutText = "Listening...";
  }

  return (
    <button
      className="p-3 text-indigo-900 border-indigo-300 border rounded "
      onClick={() => {
        dispatch(
          setItemIdListeningForHotkey(isThisItemListeningForHotkey ? null : id)
        );
      }}
    >
      {keyboardShortcutText}
    </button>
  );
}
