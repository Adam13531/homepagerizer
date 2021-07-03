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
    <div className="gap-2 flex flex-wrap">
      {children}

      <button
        className="bg-indigo-50 text-indigo-900 cursor-pointer px-4 py-3 border border-indigo-300 rounded space-x-2 flex items-center h-14"
        onClick={() => dispatch(addItemAtEndOfRow(rowNum))}
      >
        <i className="las la-link"></i> Add link
      </button>
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
