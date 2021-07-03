import KeyboardShortcutButton from "./KeyboardShortcutButton";
import useDragAndDropItem from "../hooks/useDragAndDropItem";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { updateItem } from "../state/contentSlice";
import { deleteItem } from "../state/actions";
import Checkbox from "rc-checkbox";

export default function RowItem({ item, itemNum, rowNum }) {
  const dispatch = useDispatch();

  const { text, url, id, isSmallText, keyboardShortcut } = item;

  const [attachBothDragAndDropRefs, isDraggingAnywhere, isDraggingOver] =
    useDragAndDropItem(itemNum, rowNum);

  const isKeyboardShortcutSet = !_.isNil(keyboardShortcut);

  const addHttps = () => {
    let newUrl = url;
    if (!url.startsWith("https://")) {
      newUrl = `https://${url}`;
    }
    dispatch(
      updateItem(rowNum, itemNum, {
        url: newUrl,
      })
    );
  };

  const tooltipOverlay = (
    <div className="flex flex-col">
      <div>
        URL:
        <input
          type="url"
          className="text-blue-600"
          placeholder="Link address"
          value={url}
          onChange={(e) => {
            dispatch(
              updateItem(rowNum, itemNum, {
                url: e.target.value,
              })
            );
          }}
        />
        <button onClick={addHttps}>https://</button>
      </div>
      <div>
        Text:
        <input
          type="text"
          className="text-green-600"
          placeholder="Link text"
          value={text}
          onChange={(e) => {
            dispatch(
              updateItem(rowNum, itemNum, {
                text: e.target.value,
              })
            );
          }}
        />
      </div>
      <div>
        Keyboard shortcut:{" "}
        <KeyboardShortcutButton item={item} rowNum={rowNum} itemNum={itemNum} />
      </div>
      <div>
        <label>
          <Checkbox
            checked={isSmallText}
            onChange={() => {
              dispatch(
                updateItem(rowNum, itemNum, {
                  isSmallText: !isSmallText,
                })
              );
            }}
          />
          Small text
        </label>
      </div>
      <div>
        <button onClick={() => dispatch(deleteItem(rowNum, itemNum, id))}>
          ❌ Delete
        </button>
      </div>
    </div>
  );

  const constantItemClasses =
    "text-indigo-900 cursor-pointer px-4 py-3 border border-indigo-300 rounded space-x-2 flex items-center h-14";
  const itemCss = classNames({
    [constantItemClasses]: true,
    "bg-indigo-300": isDraggingOver,
  });

  return (
    <span ref={attachBothDragAndDropRefs} className={itemCss}>
      {isKeyboardShortcutSet && (
        <span
          className={
            "border border-indigo-300 rounded px-2 py-1 text-xs font-semibold"
          }
        >
          {keyboardShortcut}
        </span>
      )}
      <span className="underline">{text}</span>
      <i class="las la-edit"></i>
    </span>
  );
}
