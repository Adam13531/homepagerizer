import { useEffect } from "react";
import {
  setItemIdListeningForHotkey,
  setLastPressedHotkey,
} from "../misc/action_creators";

/**
 * A button that knows how to listen to a keyboard shortcut and update the item
 * that this belongs to.
 */
export default function KeyboardShortcutButton({
  item,
  onUpdateKeyboardShortcut,
  state,
  dispatch,
}) {
  const { itemIdListeningForHotkey, lastPressedHotkey } = state;
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

    onUpdateKeyboardShortcut(realHotkey);
  }, [lastPressedHotkey, isThisItemListeningForHotkey]);

  let keyboardShortcutText = _.isNil(keyboardShortcut)
    ? "(unset)"
    : keyboardShortcut;

  if (isThisItemListeningForHotkey) {
    keyboardShortcutText = "Listening...";
  }

  return (
    <button
      className="border-2"
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
