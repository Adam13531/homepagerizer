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
 * Tries decoding JSON from the query parameters.
 *
 * From July 6th, 2021 to July 16th, 2021, this used "btoa" to encode and "atob"
 * to decode, which meant it was broken for Unicode characters like emojis. I
 * fixed this on July 16th, but in order to still support the legacy way, I
 * changed the name of the query parameter from "base64json" to "encodedjson".
 * Given how few days the bug was present for and how I hadn't advertised
 * Homepagerizer much, the "base64json" path can probably be safely deleted
 * after a few weeks.
 * @param {URLSearchParams} urlParams
 * @return {?Object} - if null, no JSON could be decoded (which may mean that
 * none was provided). If defined, it represents the saved JSON.
 */
function decodeJson(urlParams) {
  let jsonStr = null;

  const base64Json = urlParams.get("base64json");
  if (!_.isNil(base64Json)) {
    jsonStr = atob(base64Json);
  } else {
    const encodedJson = urlParams.get("encodedjson");
    if (!_.isNil(encodedJson)) {
      jsonStr = decodeURIComponent(encodedJson);
    }
  }

  return _.isNil(jsonStr) ? null : JSON.parse(jsonStr);
}

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

    const decodedJson = decodeJson(urlParams);

    if (!_.isNil(decodedJson)) {
      dispatch(loadSavedState(decodedJson));
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
