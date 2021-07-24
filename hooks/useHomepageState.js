import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllColors } from "../state/colorsSlice";
import {
  selectRows,
  selectHomepagerizerAddress,
  selectFontFamily,
  selectHorizontalSpacing,
  selectVerticalSpacing,
  selectHomepageTitle,
} from "../state/contentSlice";

/**
 * @return {Object} - all of the pieces of state needed to call
 * generateHtml.
 */
export default function useHomepageState() {
  const allColors = useSelector(selectAllColors);
  const rows = useSelector(selectRows);
  const homepagerizerAddress = useSelector(selectHomepagerizerAddress);
  const fontFamily = useSelector(selectFontFamily);
  const horizontalSpacing = useSelector(selectHorizontalSpacing);
  const verticalSpacing = useSelector(selectVerticalSpacing);
  const homepageTitle = useSelector(selectHomepageTitle);
  const state = useMemo(() => {
    return {
      rows,
      homepagerizerAddress,
      fontFamily,
      horizontalSpacing,
      verticalSpacing,
      homepageTitle,
      ...allColors,
    };
  }, [
    rows,
    homepagerizerAddress,
    fontFamily,
    horizontalSpacing,
    verticalSpacing,
    homepageTitle,
    allColors,
  ]);

  return state;
}
