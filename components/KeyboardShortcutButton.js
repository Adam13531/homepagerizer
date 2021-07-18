import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button, { ButtonThemes } from "./Button";
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
    <Button
      theme={ButtonThemes.WHITE}
      onClick={() => {
        dispatch(setIsListeningForHotkey(!isListeningForHotkey));
      }}
    >
      {keyboardShortcutText}
    </Button>
  );
}
