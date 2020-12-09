
import { v4 as uuidv4 } from 'uuid';

export class Node  {
    constructor(name) {
        this._id = uuidv4();
        this._name = '';
        this._inputs = [];
        this._outputs = [];
        this._nexts = [];
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
    set name(val) {
        this._name = val;
    }

    get inputs() {
        return this._inputs;
    }
    set inputs(val) {
        this._inputs = val;
    }

    get outputs() {
        return this._outputs;
    }
    
    set outputs(val) {
        this._outputs = val;
    }
    
    get nexts() {
        return this._nexts;
    }
    set nexts(val) {
        this._nexts = val;
    }
    toString() {
        return 'N(\'' + this._id + '\',' +
            this._inputs.length + 'i,' +
            this._outputs.length + 'o,' +
            this._nexts.length + 'n)';
    }

    process() {
        return new Result();
    }
}

export class Result {
    constructor(next) {
        this._next = next || null;
    }
    get next() {
        return this._next;
    }
    set next(val) {
        this._next = val;
    }
}

export class Program extends Node {
    constructor(name) {
        super(name)
        this._nodes = new Map();
        this._start = null;
    }
    get name() {
        return this._name;
    }
    addNode(node, isStart) {
        this._nodes.set(node.id, node);
        if(isStart) {
            this._start = node;
        }
    }
    removeNode(node) {
        this._nodes.delete(node.id);
    }
    clear() {
        this._nodes = [];
    }
    toString() {
        return 'P{\'' + this._name + '\',{' +
        this._nodes.reduce((t, n, i, a) => t + n.toString() + (i < a.length-1 ? ',': ''), '') +
        '}';
    }
    process() {
        if(!this._start) {
            return new Result();
        }
        let currentNode = this._start;
        while( currentNode !== null) {
            let result = currentNode.process();
            currentNode = result.next;
        }
    }
}
