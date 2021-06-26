import { useEffect } from "react";
import _ from "lodash";
import {
  setItemIdListeningForHotkey,
  setLastPressedHotkey,
} from "./action_creators";

/**
 * These are hotkeys that can't be used to activate links.
 */
const invalidHotkeys = [
  "Escape",
  "Shift",
  "Fn",
  "Meta",
  "Super",
  "Symbol",
  "Hyper",
  "Alt",
  "AltGraph",
  "CapsLock",
  "Control",
  "Tab",
];

/**
 * Returns true if the specified keyboard shortcut is in use.
 * @param {Object} state
 * @param {string} keyboardShortcut
 * @return {boolean}
 */
function isKeyboardShortcutInUse(state, keyboardShortcut) {
  // This searches through every row and item rather than using a hashmap. It
  // can be improved, but there likely won't ever be more than about 100 items
  // anyway on anyone's homepage.
  return _.find(state.rows, (row) => {
    return _.find(row, { keyboardShortcut });
  });
}

export default function useKeyboardListener(state, dispatch) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;
      console.log("key: " + JSON.stringify(key));

      // If we're not even listening for a hotkey, then don't do anything.
      if (_.isNil(state.itemIdListeningForHotkey)) {
        return;
      }

      e.preventDefault();
      if (key === "Escape") {
        dispatch(setItemIdListeningForHotkey(null));
        return;
      }

      // Don't allow invalid hotkeys.
      if (_.includes(invalidHotkeys, key)) {
        return;
      }

      const toast = () => {
        window.alert("I never coded the toast stuff");
      };

      if (isKeyboardShortcutInUse(state, key)) {
        toast(
          `${key} is already in use; press another keyboard key or escape to cancel.`,
          {
            type: "error",
          }
        );
      } else {
        dispatch(setLastPressedHotkey(key));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state, dispatch]);
}
