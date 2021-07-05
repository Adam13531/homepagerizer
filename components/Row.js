import classNames from "classnames";
import useDragAndDropRow from "../hooks/useDragAndDropRow";
import { useDispatch } from "react-redux";
import { addItemAtEndOfRow, deleteRow } from "../state/contentSlice";

export default function Row({ children, rowNum }) {
  const dispatch = useDispatch();

  const [dragRef, attachDropAndDragPreviewRefs, isDraggingOver] =
    useDragAndDropRow(rowNum);

  const css = classNames({
    flex: true,
    "shadow-xl": isDraggingOver,
  });

  return (
    <div ref={attachDropAndDragPreviewRefs} className={css}>
      <div
        className="border rounded-l-lg border-indigo-300 flex items-center px-2 cursor-grab"
        ref={dragRef}
      >
        <i className="las la-braille font-bold"></i>
      </div>
      <div className="gap-2 px-4 flex flex-wrap border border-r-0 border-l-0 border-indigo-300 py-4">
        {children}

        <button
          className="bg-indigo-50 text-indigo-900 cursor-pointer px-4 py-3 border border-indigo-300 rounded space-x-2 flex items-center h-14"
          onClick={() => dispatch(addItemAtEndOfRow(rowNum))}
        >
          <i className="las la-link"></i> Add link
        </button>
      </div>
      <button
        onClick={() => dispatch(deleteRow(rowNum))}
        className="border rounded-r-lg border-red-300 flex items-center text-red-600 px-2 bg-red-50"
      >
        <i className="las la-trash-alt font-bold"></i>
      </button>
    </div>
  );
}
