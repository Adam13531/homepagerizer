import _ from "lodash";

/**
 * Given an object representing a superset of the desired state for our
 * application, this will prune the extra parameters out.
 *
 * For an example of WHY we want this: we save homepagerizerAddress into the
 * resulting homepage so that we know which URL to navigate to on edit, but
 * suppose that URL redirected us elsewhere; we would want the new page to
 * overwrite that address.
 * @param {Object} jsonObject
 * @return {Object}
 */
export function getStateFromJson(jsonObject) {
  const pathsToKeep = [
    "rows",
    "bgColor",
    "textColor",
    "linkColor",
    "accentColor",
    "hoverColor",
  ];
  return _.pick(jsonObject, pathsToKeep);
}

/**
 * @param {string} html - a string representing the lines of HTML
 * @return {Object} state
 */
export function parseHtml(html) {
  // The first script tag has our JSON in it. From there, we can restore our
  // state.
  let jsonStr = null;
  const lines = html.split("\n");
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    if (line.startsWith("<script")) {
      jsonStr = lines[i + 1];
      break;
    }
  }

  if (_.isNil(jsonStr)) {
    throw new Error("Could not parse HTML");
  }

  const json = JSON.parse(jsonStr);
  return getStateFromJson(json);
}
