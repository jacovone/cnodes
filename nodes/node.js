
import { v4 as uuidv4 } from 'uuid';

export class Program {
    constructor() {
        this._nodes = [];
    }
    get nodes() {
        return this._nodes;
    }
}

export class Node  {
    constructor() {
        this._id = uuidv4();
        this._inputs = [];
        this._outputs = [];
        this._nexts = [];
        this._program = null;
    }

    get id() {
        return this._id;
    }

    get inputs() {
        return this._inputs;
    }

    get outputs() {
        return this._outputs;
    }
    
    get nexts() {
        return this._nexts;
    }

    addTo(program) {
        program.nodes.push(this._id);
    }

    logic(context) {

    }
}

export class Node2  {
    constructor() {}

    out() {
        console.log('out!!!')
    }
}
