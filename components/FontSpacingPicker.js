import { useSelector, useDispatch } from "react-redux";
import {
  setHorizontalSpacing,
  selectHorizontalSpacing,
  setVerticalSpacing,
  selectVerticalSpacing,
} from "../state/contentSlice";

export default function FontSpacingPicker({ isHorizontal }) {
  const dispatch = useDispatch();
  const horizontalSpacing = useSelector(selectHorizontalSpacing);
  const verticalSpacing = useSelector(selectVerticalSpacing);

  return (
    <span>
      <div className="text-indigo-900 mb-2">
        {isHorizontal ? "Horizontal spacing" : "Vertical spacing"}
      </div>
      <input
        type="number"
        className="border rounded border-indigo-300 py-3 px-4 w-44 text-indigo-900"
        placeholder={"Type a number"}
        value={isHorizontal ? horizontalSpacing : verticalSpacing}
        onChange={(e) => {
          if (isHorizontal) {
            dispatch(setHorizontalSpacing(e.target.value));
          } else {
            dispatch(setVerticalSpacing(e.target.value));
          }
        }}
      />
    </span>
  );
}
