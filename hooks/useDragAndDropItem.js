import { useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectRows,
  deleteItem,
  addItemBefore,
  updateItem,
} from "../state/contentSlice";

/**
 * Get an item's coordinates (its row and item indices).
 * @param {Array<Object>} rows
 * @param {string} itemId
 * @return {?Object}
 */
function getCoordinatesOfItemById(rows, itemId) {
  for (const [rowNum, row] of rows.entries()) {
    for (const [itemNum, item] of row.entries()) {
      if (item.id === itemId) {
        return { rowNum, itemNum };
      }
    }
  }

  return null;
}

export default function useDragAndDropItem(itemNum, rowNum) {
  const dispatch = useDispatch();
  const rows = useSelector(selectRows);

  const onRelocateItem = useCallback(
    (rowNum, itemNum, targetRowNum, targetItemNum) => {
      // Don't allow moving an item onto itself since it would be a no-op
      // anyway.
      if (rowNum === targetRowNum && itemNum === targetItemNum) {
        return;
      }

      const sourceItem = rows[rowNum][itemNum];
      const targetItem = rows[targetRowNum][targetItemNum];

      dispatch(deleteItem(rowNum, itemNum));

      // Deleting the source item may have changed the item number of the target,
      // so we fetch the current values.
      const { rowNum: currentTargetRowNum, itemNum: currentTargetItemNum } =
        getCoordinatesOfItemById(rows, targetItem.id);

      dispatch(addItemBefore(currentTargetRowNum, currentTargetItemNum));
      dispatch(updateItem(targetRowNum, targetItemNum, sourceItem));
    },
    [rows]
  );

  const [{ isDragging: isDraggingAnywhere }, drag] = useDrag(
    () => ({
      type: "ITEM",
      end: (item, monitor) => {
        if (monitor.didDrop()) {
          // Use the dropped item's coordinates to relocate the item.
          const { itemNum: targetItemNum, rowNum: targetRowNum } =
            monitor.getDropResult();
          onRelocateItem(rowNum, itemNum, targetRowNum, targetItemNum);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [onRelocateItem, itemNum, rowNum]
  );

  const [{ isOver: isDraggingOver }, drop] = useDrop(
    () => ({
      accept: "ITEM",

      // When an item is dropped, return its coordinates.
      drop: () => {
        return {
          itemNum,
          rowNum,
        };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [itemNum, rowNum]
  );

  const attachBothDragAndDropRefs = (el) => {
    drag(el);
    drop(el);
  };

  return [attachBothDragAndDropRefs, isDraggingAnywhere, isDraggingOver];
}
