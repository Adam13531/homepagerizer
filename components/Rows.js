import _ from "lodash";
import Row from "./Row";
import RowItem from "./RowItem";
import { addRow, deleteRow, addItemAtEndOfRow } from "../misc/action_creators";

export default function Rows({ state, dispatch }) {
  return (
    <>
      {_.map(state.rows, (row, rowNum) => (
        <Row
          key={rowNum}
          state={state}
          dispatch={dispatch}
          onAddItem={() => dispatch(addItemAtEndOfRow(rowNum))}
          onDelete={() => dispatch(deleteRow(rowNum))}
        >
          {_.map(row, (item, itemNum) => {
            return (
              <RowItem
                key={`${item.id}`}
                item={item}
                itemNum={itemNum}
                rowNum={rowNum}
                dispatch={dispatch}
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
