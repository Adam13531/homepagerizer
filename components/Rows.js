import _ from "lodash";
import Row from "./Row";
import RowItem from "./RowItem";
import { useSelector, useDispatch } from "react-redux";
import { addRow, selectRows } from "../state/contentSlice";

export default function Rows() {
  const rows = useSelector(selectRows);

  const dispatch = useDispatch();

  return (
    <>
      <div className="space-y-4 mb-4">
        {_.map(rows, (row, rowNum) => {
          // Row keys aren't all that important until rows are moved, and since
          // they don't have an identifier, we'll use the first item's ID (if
          // there is one).
          const rowKey = `${rowNum}_${_.get(row[0], "id")}`;
          return (
            <Row key={rowKey} rowNum={rowNum}>
              {_.map(row, (item, itemNum) => {
                return (
                  <RowItem
                    key={`${item.id}`}
                    item={item}
                    itemNum={itemNum}
                    rowNum={rowNum}
                  />
                );
              })}
            </Row>
          );
        })}
      </div>
      <div className="flex justify-end">
        <button
          className="bg-indigo-50 border-indigo-300 text-indigo-900 border rounded px-4 py-3"
          onClick={() => {
            dispatch(addRow());
          }}
        >
          Add Row
        </button>
      </div>
    </>
  );
}
