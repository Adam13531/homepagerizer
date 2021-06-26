import actions from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case actions.ADD_ROW:
      return { ...state, rows: [...state.rows, []] };
    case actions.DELETE_ROW: {
      const { rowNum } = action;
      return {
        ...state,
        rows: [...state.rows.slice(0, rowNum), ...state.rows.slice(rowNum + 1)],
      };
    }
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
}
