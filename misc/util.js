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
