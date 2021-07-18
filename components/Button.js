import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { createEnum } from "../misc/util";
import _ from "lodash";

/**
 * This concept of themes may seem a bit unusual since it's not quite CSS, but
 * it's not like I'm making React components out of the individual buttons. I
 * wanted all of the themes to be in one place.
 */
export const ButtonThemes = createEnum([
  // Buttons with simple colors.
  "LIGHT_INDIGO",
  "DARK_INDIGO",
  "WHITE",

  // Color-picker buttons, whose colors are largely dynamic.
  "COLOR_PICKER",

  // This looks like a link to something but still requires a button's onClick
  // property (as opposed to just being an href).
  "DELETE_LINK",

  // Just an icon, e.g. the "import" button.
  "ICON",
]);

const buttonBaseTheme = "px-4 py-3 rounded border";

function getCssFromTheme(theme) {
  switch (theme) {
    case ButtonThemes.LIGHT_INDIGO:
      return classNames(
        buttonBaseTheme,
        "border-indigo-300 bg-indigo-50 text-indigo-900 hover:bg-indigo-100 hover:border-indigo-600 focus:bg-indigo-200 focus:border-indigo-700"
      );
    case ButtonThemes.DARK_INDIGO:
      return classNames(
        buttonBaseTheme,
        "border-indigo-700 bg-indigo-700 text-white hover:bg-indigo-600 hover:border-indigo-600 focus:bg-indigo-700 focus:border-indigo-700"
      );
    case ButtonThemes.WHITE:
      return classNames(
        buttonBaseTheme,
        "bg-white text-gray-800 border-indigo-600 hover:bg-indigo-100 hover:border-indigo-600 focus:bg-indigo-100 focus:border-indigo-700"
      );
    case ButtonThemes.COLOR_PICKER:
      return classNames(
        "px-4 py-3 border border-indigo-300 rounded-r hover:opacity-80 hover:border-indigo-600"
      );
    case ButtonThemes.DELETE_LINK:
      return classNames("text-red-600 hover:text-red-800");
    case ButtonThemes.ICON:
      return classNames("text-indigo-900 hover:bg-indigo-50");
  }
}

/**
 * Simple, reusable button component, mostly just to handle the different styles
 * of buttons moreso than functionality.
 */
export default function Button({
  children,
  disabled,
  theme,
  className,
  ...htmlProps
}) {
  if (disabled) {
    className = classNames(className, "opacity-75 cursor-not-allowed");
  } else {
    className = classNames(className, "cursor-pointer");
  }

  const themeClass = _.isNil(theme) ? "" : getCssFromTheme(theme);
  className = classNames(themeClass, className);

  return (
    <button disabled={disabled} className={className} {...htmlProps}>
      {children}
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.oneOf(_.keys(ButtonThemes)),
};

Button.defaultProps = {
  disabled: false,
};
