import { useEffect } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { selectRows, selectItem } from "../state/contentSlice";
import { selectEditingItem } from "../state/editingSlice";
import {
  setIsListeningForHotkey,
  setLastPressedHotkey,
  selectIsListeningForHotkey,
} from "../state/keyboardSlice";

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
 * @param {Array<Object>} rows
 * @param {string} keyboardShortcut
 * @return {?item}
 */
function getItemUsingKeyboardShortcut(rows, keyboardShortcut) {
  // This searches through every row and item rather than using a hashmap. It
  // can be improved, but there likely won't ever be more than about 100 items
  // anyway on anyone's homepage.
  for (let row of rows) {
    const foundItem = _.find(row, { keyboardShortcut });
    if (!_.isNil(foundItem)) {
      return foundItem;
    }
  }
  return null;
}

/**
 * Hook to install keyboard listeners on the entire window that can be used to
 * set up hotkeys for items. Only one item can have its hotkey set at a time.
 */
export default function useKeyboardListener() {
  const dispatch = useDispatch();
  const rows = useSelector(selectRows);
  const isListeningForHotkey = useSelector(selectIsListeningForHotkey);
  const { rowNum, itemNum } = useSelector(selectEditingItem);
  const item = useSelector(selectItem(rowNum, itemNum));
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

      // If we're not even listening for a hotkey, then don't do anything.
      if (!isListeningForHotkey) {
        return;
      }

      e.preventDefault();

      // Pressing escape bails out of setting a hotkey.
      if (key === "Escape") {
        dispatch(setIsListeningForHotkey(false));
        return;
      }

      // Don't allow invalid hotkeys.
      if (_.includes(invalidHotkeys, key)) {
        return;
      }

      // Ensure no other items are using this shortcut.
      const itemUsingKeyboardShortcut = getItemUsingKeyboardShortcut(rows, key);
      if (
        !_.isNil(itemUsingKeyboardShortcut) &&
        itemUsingKeyboardShortcut.id !== _.get(item, "id")
      ) {
        toast(
          `${key} is already in use by "${itemUsingKeyboardShortcut.text}"; choose a different keyboard shortcut.`,
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
  }, [rows, isListeningForHotkey, item, dispatch]);
}
