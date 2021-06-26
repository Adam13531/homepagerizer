import actions from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case actions.ADD_ROW:
      return { ...state, rows: [...state.rows, []] };
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
}
