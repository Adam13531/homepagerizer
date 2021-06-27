import { useDispatch } from "react-redux";
import { addItemAtEndOfRow, deleteRow } from "../state/contentSlice";

export default function Row({ children, rowNum }) {
  const dispatch = useDispatch();
  return (
    <div className="space-x-2">
      {children}
      <button onClick={() => dispatch(addItemAtEndOfRow(rowNum))}>➕</button>
      <button onClick={() => dispatch(deleteRow(rowNum))}>Delete row</button>
    </div>
  );
}
