import _ from "lodash";
import Row from "./Row";
import { addRow, deleteRow } from "../misc/action_creators";

export default function Rows({ state, dispatch }) {
  return (
    <>
      {_.map(state.rows, (row, rowNum) => (
        <Row key={rowNum} onDelete={() => dispatch(deleteRow(rowNum))}>
          Hello world
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
