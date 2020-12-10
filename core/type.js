
export const TypeEnum = {
    NUMBER: 'number',
    STRING: 'string',
    BOOLEAN: 'boolean',
    OBJECT: 'object'
}

export class Type {
    #type = TypeEnum.NUMBER;
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