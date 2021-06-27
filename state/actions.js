/**
 * This file is for any actions that need to be used by multiple reducers.
 */

import { createAction } from "@reduxjs/toolkit";

export const loadSavedState = createAction("global/loadSavedState");
export const deleteItem = createAction(
  "deleteItem",
  // The id is needed because this action is currently handled by multiple
  // reducers, and it's possible that the underlying item gets deleted before
  // all reducers have a chance to handle it, so we need any relevant item
  // details at the time of calling deleteItem.
  function prepare(rowNum, itemNum, id) {
    return {
      payload: {
        rowNum,
        itemNum,
        id,
      },
    };
  }
);
