import generateHtml from "../misc/generateHtml";
import { useMemo } from "react";
import debounceRender from "react-debounce-render";
import useHomepageState from "../hooks/useHomepageState";

function Preview() {
  const homepageState = useHomepageState();
  const srcDoc = useMemo(
    () => generateHtml(homepageState, { showEditButton: false }),
    [homepageState]
  );

  return (
    <div>
      <div>Your homepage's preview:</div>
      <iframe className="w-full" srcDoc={srcDoc} />
    </div>
  );
}

export default debounceRender(Preview, 200, { maxWait: 500 });
