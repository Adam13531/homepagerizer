import { useEffect } from "react";
import _ from "lodash";
import {
  setHomepagerizerAddress,
  loadSavedState,
} from "../misc/action_creators";
import { getStateFromJson } from "../misc/parseHtml";

/**
 * Hook that acts on the URL bar on first use (e.g. to store the host address
 * and to parse query params).
 */
export default function useUrlEffects(dispatch) {
  useEffect(() => {
    const homepagerizerAddress = `${location.protocol}//${location.host}`;
    dispatch(setHomepagerizerAddress(homepagerizerAddress));

    const urlParams = new URLSearchParams(location.search);

    const base64Json = urlParams.get("base64json");
    if (!_.isNil(base64Json)) {
      const jsonStr = atob(base64Json);
      const jsonObj = JSON.parse(jsonStr);
      dispatch(loadSavedState(getStateFromJson(jsonObj)));
    }
  }, []);
}
