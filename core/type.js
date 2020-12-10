
export const Types = {
    NUMBER: 'number',
    STRING: 'string',
    BOOLEAN: 'boolean',
    OBJECT: 'object',
    ANY: 'any',
}

export class Type {
    #type = Types.NUMBER;
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

export function type(type, isArray) {
    return new Type(type, isArray);
}