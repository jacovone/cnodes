# cnodes

## Introduction

cnodes is a representation-agnostic engine that define a process and is able
to execute it. The representation ca be stored and reload as JSON object.

## Install
```bash
npm install @marco.jacovone/cnodes --save
```

## Getting started
```js
let p = new Program();

let n1 = addNode();
let n2 = consoleNode();

n1.input('Val1').value = 2;
n1.input('Val2').value = 3;
n1.output('Result').connect(n2.input('Val'));

p.addNode(n1);
p.addNome(n2, true); // First node to execute

p.process(); // Expected result: 5
```

Short form:

```js
process().addNode(n1).addNode(n2, true).process();
```

## Examples


---

### Copyright (c) 2020 Marco Jacovone
#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.