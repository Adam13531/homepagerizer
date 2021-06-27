/**
 * This file is for any actions that need to be used by multiple reducers.
 */

import { createAction } from "@reduxjs/toolkit";

export const loadSavedState = createAction("global/loadSavedState");
