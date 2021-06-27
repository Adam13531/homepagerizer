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
      {_.map(rows, (row, rowNum) => (
        <Row key={rowNum} rowNum={rowNum}>
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
      ))}

      <button
        onClick={() => {
          dispatch(addRow());
        }}
      >
        Add row
      </button>
    </>
  );
}
