import _ from "lodash";
import Row from "./Row";
import RowItem from "./RowItem";
import { useSelector, useDispatch } from "react-redux";
import { addRow, selectRows } from "../state/contentSlice";
import Button, { ButtonThemes } from "./Button";

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
        <Button
          theme={ButtonThemes.LIGHT_INDIGO}
          onClick={() => {
            dispatch(addRow());
          }}
        >
          <i className="las la-plus-circle"></i> Add Row
        </Button>
      </div>
    </>
  );
}
