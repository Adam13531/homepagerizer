import { useSelector, useDispatch } from "react-redux";
import { setFontFamily, selectFontFamily } from "../state/contentSlice";

export default function FontPicker({}) {
  const dispatch = useDispatch();
  const fontFamily = useSelector(selectFontFamily);

  return (
    <>
      <div className="text-indigo-900 mb-2">Font Family</div>
      <input
        type="text"
        className="border rounded border-indigo-300 py-3 px-4 w-44 text-indigo-900"
        placeholder={"Type a font name"}
        value={fontFamily}
        onChange={(e) => {
          dispatch(setFontFamily(e.target.value));
        }}
      />
    </>
  );
}
