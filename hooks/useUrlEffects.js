import { useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import {
  addRow,
  addItemAtEndOfRow,
  updateItem,
  setHomepagerizerAddress,
  selectRows,
} from "../state/contentSlice";
import { loadSavedState } from "../state/actions";

/**
 * Hook that acts on the URL bar on first use (e.g. to store the host address
 * and to parse query params).
 */
export default function useUrlEffects() {
  const dispatch = useDispatch();
  const rows = useSelector(selectRows);
  useEffect(() => {
    const homepagerizerAddress = `${location.protocol}//${location.host}`;
    dispatch(setHomepagerizerAddress(homepagerizerAddress));

    const urlParams = new URLSearchParams(location.search);

    const base64Json = urlParams.get("base64json");
    if (!_.isNil(base64Json)) {
      const jsonStr = atob(base64Json);
      const jsonObj = JSON.parse(jsonStr);
      dispatch(loadSavedState(jsonObj));
    } else {
      // Start the user out with some content so that they know what to expect.
      //
      // The .isEmpty is only needed during development so that hot-reloading
      // doesn't cause this item to repeatedly get added every time there's a
      // code change.
      if (_.isEmpty(rows)) {
        dispatch(addRow());
        dispatch(addItemAtEndOfRow(0));
        dispatch(
          updateItem(0, 0, {
            text: "Your first link",
          })
        );
      }
    }
  }, []);
}
