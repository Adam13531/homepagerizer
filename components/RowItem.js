import Tooltip from "rc-tooltip";
import KeyboardShortcutButton from "./KeyboardShortcutButton";
import useDragAndDropItem from "../hooks/useDragAndDropItem";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { updateItem, addItemBefore } from "../state/contentSlice";
import { deleteItem } from "../state/actions";
import Checkbox from "rc-checkbox";

export default function RowItem({ item, itemNum, rowNum }) {
  const dispatch = useDispatch();

  const { text, url, id, isSmallText } = item;

  const [attachBothDragAndDropRefs, isDraggingAnywhere, isDraggingOver] =
    useDragAndDropItem(itemNum, rowNum);

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

  const itemCss = classNames({
    "text-blue-500": true,
    "cursor-pointer": true,
    "border-2": isDraggingOver,
  });

  return (
    <span className="space-x-2">
      <button onClick={() => dispatch(addItemBefore(rowNum, itemNum))}>
        ➕
      </button>
      <Tooltip
        placement={"bottom"}
        mouseLeaveDelay={0.2}
        overlayInnerStyle={isDraggingAnywhere ? { display: "none" } : {}}
        overlay={tooltipOverlay}
        align={{
          offset: [0, 0],
        }}
        transitionName=""
      >
        <span ref={attachBothDragAndDropRefs} className={itemCss}>
          {text}
        </span>
      </Tooltip>
    </span>
  );
}
