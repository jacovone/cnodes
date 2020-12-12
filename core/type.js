
export const Types = {
    NUMBER: 'number',
    STRING: 'string',
    BOOLEAN: 'boolean',
    OBJECT: 'object',
    ANY: 'any',
}

export class Type {
    _type = Types.NUMBER;
    _isArray = false;

    constructor(type, isArray) {
        this._type = type;
        this._isArray = isArray;
    }
    get type() {
        return this._type;
    }
    set type(val) {
        this._type = val;
    }
    get isArray() {
        return this._isArray;
    }
    set isArray(val) {
        this._isArray = val;
    }
}

export function type(type, isArray) {
    return new Type(type, isArray);
}