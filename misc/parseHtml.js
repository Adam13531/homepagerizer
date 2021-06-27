import _ from "lodash";

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
  return json;
}
