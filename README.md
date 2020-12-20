# cnodes

## Introduction

**cnodes** is a representation-agnostic engine that define a process and is able
to execute it. The representation ca be stored and reload as JSON object.
Its UI counterpart is [cnodes-ui](https://github.com/marco-jacovone/cnodes-ui), an advanced user interface to define and test
graphs. The UI can be integrated with your clients and the "engine" can be easly integrated
in your backends.

## Install

```bash
npm install @marco.jacovone/cnodes --save
```

## Getting started

```js
// Create a new program
let prg = program();

// create the "For" node
let fn = forNode();
// Define console node
let cn = consoleNode();

// Create flow connections and inputs/outputs
fn.prev.connect(prg.enter.next("Begin"));
fn.input("From").connect(prg.enter.output("Val"));
fn.input("To").value = 10;

prg.exit.prev.connect(fn.next("Out"));
cn.prev.connect(fn.next("Do"));
cn.input("Val").connect(fn.output("Index"));

// Execute
prg.addNode(fn).addNode(cn).process();

// Export
let dmp = Env.export(prg);
console.log(JSON.stringify(dmp));
```

The resulting graph with cnodes-ui looks like this:

![Screenshot2](https://github.com/marco-jacovone/cnodes-ui/blob/main/doc/images/screenshot2.png?raw=true)

## Demo

Try a demo test board at:

[DEMO Test board](https://unpkg.com/@marco.jacovone/cnodes-ui/dist/index.html)

## State of the art

The project is actually in a early alpha stage, but is growing rapidly ;-)

---

### Copyright (c) 2020 Marco Jacovone

#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
