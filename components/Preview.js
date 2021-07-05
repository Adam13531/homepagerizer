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
      <div className="text-indigo-900 font-bold text-2xl text-center mb-4">
        Homepage Preview
      </div>
      <iframe
        className="border rounded border-indigo-300 w-full h-96"
        srcDoc={srcDoc}
      />
    </div>
  );
}

export default debounceRender(Preview, 200, { maxWait: 500 });
