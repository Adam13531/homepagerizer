import _ from "lodash";
import packageJson from "../package.json";

/**
 * Form an HTML string representing a link in such a way that its keyboard
 * shortcut is obvious. This only changes the text when the shortcut is a single
 * letter or number. It follows these rules:
 *
 * 1. If the text contains the shortcut, then the first instance of it is
 *    highlighted (e.g. "YouTube" + "y" will highlight the first letter). This
 *    is case-insensitive, so "YouTube" + "Y" will also highlight the first
 *    letter.
 * 2. If the text does NOT contain the shortcut, then it is added in parentheses
 *    after the text (e.g. "YouTube" + "v" will return "YouTube (v)").
 * @param {string} text
 * @param {?string} keyboardShortcut
 * @return {string}
 */
function getLinkTextGivenShortcut(text, keyboardShortcut) {
  if (_.isNil(keyboardShortcut)) {
    return text;
  }

  const alphanumericRegex = /^[a-zA-Z0-9]$/;
  const isAlphanumericShortcut = alphanumericRegex.test(keyboardShortcut);

  if (isAlphanumericShortcut) {
    const indexOfShortcut = text
      .toLowerCase()
      .indexOf(keyboardShortcut.toLowerCase());
    if (indexOfShortcut !== -1) {
      const start = text.substring(0, indexOfShortcut);
      const end = text.substring(indexOfShortcut + 1);
      return `${start}<span class="shortcut">${text[indexOfShortcut]}</span>${end}`;
    }
  }

  return `${text} (<span class="shortcut">${keyboardShortcut}</span>)`;
}

function addHttpsIfNoProtocolPresent(url) {
  // We don't check for slashes in case the user has something like
  // "intent:<android app>".
  const regex = /^\w+:/g;
  if (url.match(regex)) {
    return url;
  }

  return `https://${url}`;
}

/**
 * Generates the HTML of the resulting homepage.
 *
 * @param {Object} state - see the useHomepageState hook for how to form
 * `state`.
 */
export default function generateHtml(state, { showEditButton = true }) {
  let content = "";
  const {
    rows,
    accentColor,
    bgColor,
    hoverColor,
    linkColor,
    textColor,
    fontFamily,
    homepageTitle,
  } = state;
  _.forEach(rows, (row) => {
    let rowElements = "";
    if (row.length === 0) {
      return;
    }
    _.forEach(row, (rowItem) => {
      const { text, url, isSmallText, keyboardShortcut } = rowItem;
      let rowContents = "";
      if (url === "") {
        rowContents = `<span>${text}</span>\n`;
      } else {
        const urlWithProtocol = addHttpsIfNoProtocolPresent(url);
        rowContents = `<a href=${urlWithProtocol}>${getLinkTextGivenShortcut(
          text,
          keyboardShortcut
        )}</a>\n`;
      }
      if (isSmallText) {
        rowContents = `<span class="small">${rowContents}</span>`;
      }
      rowElements += `${rowContents}`;
    });
    content += `<tr><td>${rowElements}</td></tr>`;
  });

  let safeFontFamily = "sans-serif";
  if (!_.isEmpty(fontFamily)) {
    safeFontFamily = `${fontFamily}, sans-serif`;
  }

  let style = `
body {
  background-color: ${bgColor};
  color: ${textColor};
  font-family: ${safeFontFamily};
}

a {
  color: ${linkColor};
}

a:active {
  color: ${linkColor};
}

a:visited {
  color: ${linkColor};
}

a:hover {
  background-color: ${hoverColor};
}

.shortcut {
  color: ${accentColor};
  font-weight: bold;
}

.small {
  font-size: 0.5rem;
}

table {
  border: 0;
}

#editDiv {
  margin-top: 2rem;
  text-align: center;
}

button {
  background: none;
  border: 0;
  color: ${linkColor};
  cursor: pointer;
  font-family: ${safeFontFamily};
}

button:hover {
  background-color: ${hoverColor};
}
`;

  // While previewing, we don't want the "Edit" button to show or else you'll end up
  // with a Homepagerizer in your Homepagerizer.
  if (!showEditButton) {
    style += `\n#editDiv{display:none;}`;
  }

  const jsonData = {
    ...state,

    // Add in the homepageVersion
    homepageVersion: packageJson.homepageVersion,
  };

  delete jsonData.selectedItem;

  // Note: the reason why the regex-matching logic for inserting the protocol
  // has to be in the JavaScript itself is because the user may not have typed
  // the protocol, so when they edit the page, we don't want to add it in
  // automatically for them
  const javascript = `
  const homepageJsonEle = document.getElementById('homepageJson');
  const json = JSON.parse(homepageJsonEle.text);
  const keysToUrls = {};
  json.rows.forEach((row) => {
    row.forEach((item) => {
      if (item.keyboardShortcut != null && item.url != null && item.url != '') {
        keysToUrls[item.keyboardShortcut] = item.url;
      }
    });
  });
  window.addEventListener("keydown", ({ctrlKey, altKey, metaKey, key}) => {
    let url = keysToUrls[key];
    if (url && !ctrlKey && !altKey && !metaKey) {
      const regex = /^\\w+:/g;
      if (!url.match(regex)) {
        url = 'https://' + url;
      }
      window.location.href = url;
    }
  });

  function editHomepage() {
    window.location.href = json.homepagerizerAddress + '/?base64json=' + btoa(JSON.stringify(json));
  }
`;

  const srcDoc = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${homepageTitle}</title>
<style type="text/css">
${style}
</style>
<script id="homepageJson" type="application/json">
${JSON.stringify(jsonData)}
</script>
<script type="text/javascript">
${javascript}
</script>
</head>
<body>
<table>
${content}
</table>
<div id="editDiv"><button id="edit" onclick="editHomepage();">✏ Edit Homepage</button></div>
</body>
</html>
`;
  return srcDoc;
}
