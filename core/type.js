/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

/**
 * Possible types for values
 */
export const Types = {
  NUMBER: "number",
  STRING: "string",
  BOOLEAN: "boolean",
  OBJECT: "object",
  ANY: "any",
};

/**
 * A type is a type and a flag indicating that the
 * type is a array of that base type
 */
export class Type {
  /** The base type */
  #type = Types.NUMBER;

  /** Is this type an array of base type? */
  #isArray = false;

  constructor(type, isArray) {
    this.#type = type;
    this.#isArray = isArray;
  }
  get type() {
    return this.#type;
  }
  set type(val) {
    this.#type = val;
  }
  get isArray() {
    return this.#isArray;
  }
  set isArray(val) {
    this.#isArray = val;
  }
}

/**
 * A helper function to create the type
 * @param {*} type The base type
 * @param {*} isArray The array flag
 */
export function type(type, isArray) {
  return new Type(type, isArray);
}
