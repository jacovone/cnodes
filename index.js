import { program, Program } from "./nodes/program.js";
import { addNode } from "./nodes/add.js";
import { consoleNode } from "./nodes/console.js";
import { ifNode } from "./nodes/if.js";
import { setvarNode } from "./nodes/setvar.js";
import { getvarNode } from "./nodes/getvar.js";

function test1() {
    let n = addNode();
    n.input('Val1').value = 12;
    n.input('Val2').value = 2;
    
    let n2 = addNode();
    n2.input('Val1').value = 10;
    n2.input('Val2').connect(n.output('Val'));
    
    let n3 = consoleNode();
    n3.input('Val').connect(n2.output('Val'))
    
    let n4 = consoleNode();
    n4.input('Val').value = 'Ciao';
    n3.next('Out').connect(n4.prev('In'));
    
    let n6 = consoleNode();
    n6.input('Val').value = 'True';
    let n7 = consoleNode();
    n7.input('Val').value = 'False';
    
    let n5 = ifNode();
    n5.input('Condition').connect(n.output('Val'));
    n5.next('Then').connect(n6.prev('In'));
    n5.next('Else').connect(n7.prev('In'));
    
    n4.next('Out').connect(n5.prev('In'));
    
    program('main').addNode(n).addNode(n2).addNode(n3, true).process();
}

function test2() {

    let n = setvarNode();
    n.input('Name').value = 'variable';
    n.input('Val').value = 120;
    
    let n2 = getvarNode();
    n2.input('Name').value = 'variable';

    let n3 = consoleNode();
    
    n.next('Out').connect(n2.prev('In'));
    n2.next('Out').connect(n3.prev('In'));
    n3.input('Val').connect(n2.output('Val'));

    program('main').addNode(n, true).addNode(n2).addNode(n3).process();
}

function test3() {

    let n = setvarNode();
    n.input('Name').value = 'variable';
    n.input('Val').value = 120;
    
    let n2 = getvarNode();
    n2.input('Name').value = 'variable';
    n2.prev('In').connect(n.next('Out'));

    let n3 = consoleNode();
    n3.input('Val').connect(n2.output('Val'));
    n3.prev('In').connect(n2.next('Out'));

    let n4 = addNode();
    n4.input('Val1').value = -1;
    n4.input('Val2').connect(n2.output('Val'));
    n4.prev('In').connect(n3.next('Out'));

    let n5 = setvarNode();
    n5.input('Name').value = 'variable';
    n5.input('Val').connect(n4.output('Val'));
    n5.prev('In').connect(n4.next('Out'));

    let n6 = ifNode();
    n6.input('Condition').connect(n5.output('Val'));
    n6.next('Then').connect(n2.prev('In'));
    n6.prev('In').connect(n5.next('Out'));

    program('main').addNode(n, true).addNode(n2).addNode(n3).addNode(n4).addNode(n5).process();
}


test3();