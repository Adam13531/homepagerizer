import _ from "lodash";
import Row from "./Row";

export default function Rows({ state, dispatch }) {
  return (
    <>
      {_.map(state.rows, (row, rowNum) => (
        <Row>Hello world</Row>
      ))}
    </>
  );
}
