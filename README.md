# cnodes

## Introduction

cnodes is a representation-agnostic engine that define a process and is able
to execute it. The representation ca be stored and reload as JSON object.

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



## Install
```bash
npm install @marco.jacovone/cnodes --save
```

## Examples
