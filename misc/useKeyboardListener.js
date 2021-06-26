import { useEffect } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
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
 * Finds the item using the specified keyboard shortcut.
 * @param {Object} state
 * @param {string} keyboardShortcut
 * @return {?item}
 */
function getItemUsingKeyboardShortcut(state, keyboardShortcut) {
  // This searches through every row and item rather than using a hashmap. It
  // can be improved, but there likely won't ever be more than about 100 items
  // anyway on anyone's homepage.
  const { rows } = state;
  for (let row of rows) {
    const foundItem = _.find(row, { keyboardShortcut });
    if (!_.isNil(foundItem)) {
      return foundItem;
    }
  }
  return null;
}

export default function useKeyboardListener(state, dispatch) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

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

      const itemUsingKeyboardShortcut = getItemUsingKeyboardShortcut(
        state,
        key
      );
      if (!_.isNil(itemUsingKeyboardShortcut)) {
        toast(
          `${key} is already in use by "${itemUsingKeyboardShortcut.text}"; press another keyboard key or escape to cancel.`,
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
