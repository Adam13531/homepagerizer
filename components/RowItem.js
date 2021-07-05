import useDragAndDropItem from "../hooks/useDragAndDropItem";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { setEditingItem } from "../state/editingSlice";

export default function RowItem({ item, itemNum, rowNum }) {
  const dispatch = useDispatch();

  const { text, keyboardShortcut } = item;

  const [attachBothDragAndDropRefs, isDraggingOver] = useDragAndDropItem(
    itemNum,
    rowNum
  );

  const isKeyboardShortcutSet = !_.isNil(keyboardShortcut);

  const constantItemClasses =
    "text-indigo-900 cursor-pointer px-4 py-3 border border-indigo-300 rounded space-x-2 flex items-center h-14";
  const itemCss = classNames({
    [constantItemClasses]: true,
    "bg-indigo-300": isDraggingOver,
  });

  return (
    <span
      ref={attachBothDragAndDropRefs}
      className={itemCss}
      onClick={() => {
        dispatch(setEditingItem(rowNum, itemNum));
      }}
    >
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
      <i className="lar la-edit"></i>
    </span>
  );
}
