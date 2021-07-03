import { useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { relocateRow } from "../state/contentSlice";

export default function useDragAndDropRow(rowNum) {
  const dispatch = useDispatch();
  const onRelocateRow = useCallback(
    (rowNum, targetRowNum) => {
      // Don't allow moving a row onto itself since it would be a no-op
      // anyway.
      if (rowNum === targetRowNum) {
        return;
      }

      dispatch(relocateRow(rowNum, targetRowNum));
    },
    [rowNum]
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ROW",
      end: (item, monitor) => {
        if (monitor.didDrop()) {
          // Use the dropped item's coordinates to relocate the item.
          const { rowNum: targetRowNum } = monitor.getDropResult();
          onRelocateRow(rowNum, targetRowNum);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [onRelocateRow, rowNum]
  );

  const [{ isOver: isDraggingOver }, drop] = useDrop(
    () => ({
      accept: "ROW",

      // When an item is dropped, return its coordinates.
      drop: () => {
        return { rowNum };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [rowNum]
  );

  const attachBothDragAndDropRefs = (el) => {
    drag(el);
    drop(el);
  };

  return [attachBothDragAndDropRefs, isDraggingOver];
}
