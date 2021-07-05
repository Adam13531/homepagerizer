import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLastPressedHotkey,
  setLastPressedHotkey,
  setIsListeningForHotkey,
  selectIsListeningForHotkey,
} from "../state/keyboardSlice";

/**
 * A button that knows how to listen to a keyboard shortcut and update the item
 * that this belongs to.
 */
export default function KeyboardShortcutButton({
  keyboardShortcut,
  onChooseShortcut,
}) {
  const dispatch = useDispatch();

  const lastPressedHotkey = useSelector(selectLastPressedHotkey);
  const isListeningForHotkey = useSelector(selectIsListeningForHotkey);

  useEffect(() => {
    if (_.isNil(lastPressedHotkey) || !isListeningForHotkey) {
      return;
    }

    // Backspace clears the hotkey
    const realHotkey =
      lastPressedHotkey === "Backspace" ? null : lastPressedHotkey;

    // Clear the last-pressed hotkey and the item requesting that hotkey.
    dispatch(setIsListeningForHotkey(false));
    dispatch(setLastPressedHotkey(null));

    onChooseShortcut(realHotkey);
  }, [lastPressedHotkey, isListeningForHotkey]);

  let keyboardShortcutText = _.isNil(keyboardShortcut)
    ? "(unset)"
    : keyboardShortcut;

  if (isListeningForHotkey) {
    keyboardShortcutText = "Listening...";
  }

  return (
    <button
      className="p-3 text-indigo-900 border-indigo-300 border rounded "
      onClick={() => {
        dispatch(setIsListeningForHotkey(!isListeningForHotkey));
      }}
    >
      {keyboardShortcutText}
    </button>
  );
}
