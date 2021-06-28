import { useDispatch } from "react-redux";
import {
  addItemAtEndOfRow,
  deleteRow,
  moveRowUp,
  moveRowDown,
} from "../state/contentSlice";

export default function Row({ children, rowNum, isLowestRow }) {
  const dispatch = useDispatch();
  return (
    <div className="space-x-2">
      {children}
      <button onClick={() => dispatch(addItemAtEndOfRow(rowNum))}>➕</button>
      <button onClick={() => dispatch(deleteRow(rowNum))}>❌</button>
      <button
        disabled={rowNum === 0}
        onClick={() => dispatch(moveRowUp(rowNum))}
      >
        ⬆
      </button>
      <button
        disabled={isLowestRow}
        onClick={() => dispatch(moveRowDown(rowNum))}
      >
        ⬇
      </button>
    </div>
  );
}
