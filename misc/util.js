import _ from "lodash";
import assert from "assert";

/**
 * Returns a basic "enum".
 *
 * The enum is string based and will looks like:
 * {
 *   value1: 'value1',
 *   value2: 'value2',
 *   ...
 * }
 *
 * The whole point of this is so that you don't need to type out values twice.
 * @param  {Array<string>} values - The enum values.
 * @return {Object} The enum (which is frozen so that you can neither add,
 * remove, nor change properties).
 */
export function createEnum(values) {
  assert(
    _.every(values, _.isString),
    "All values of an enum must be a string."
  );

  return Object.freeze(
    _.reduce(
      values,
      (accumulator, value) => {
        accumulator[value] = value;

        return accumulator;
      },
      {}
    )
  );
}

// https://stackoverflow.com/a/9664560/3595355
export function isColorBright(hexString) {
  const { r, g, b } = hexToRgb(hexString);
  let brightness = r * 299 + g * 587 + b * 114;
  brightness /= 255000;

  return brightness >= 0.5;
}

/**
 * Given a string like '#ff00ff' or '012345', this will return an object
 * representing each individual color component.
 * @param {string} hexString
 * @return {Object}
 */
export function hexToRgb(hexString) {
  if (hexString.startsWith("#")) {
    hexString = hexString.substr(1);
  }
  const hexVal = parseInt(hexString, 16);
  const r = (hexVal & 0xff0000) >> 16;
  const g = (hexVal & 0x00ff00) >> 8;
  const b = hexVal & 0x0000ff;
  return { r, g, b };
}

/**
 * Ensures that the given string starts with a "#".
 * @param {string} str
 * @return {string}
 */
export function ensureStartsWithHash(str) {
  return str.startsWith("#") ? str : `#${str}`;
}

/**
 * If the input string only contains whitespace, then the default value will be
 * returned.
 * @param {string} str
 * @param {string} defaultValue
 * @return {string}
 */
export function defaultIfBlankStr(str, defaultValue) {
  if (_.isNil(str) || _.isEmpty(_.trim(str))) {
    return defaultValue;
  }

  return str;
}
