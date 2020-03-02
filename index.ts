// Import stylesheets
import './style.css';


// import {Interpreter} from './simple-add-parser';


// import { Lexer } from './compiler/lexer';
// import { Interpreter } from './compiler/part-5/interpreter';
import { Lexer } from './compiler/part-6/lexer';
import { Parser } from './compiler/part-6/parser';
import { Tree } from './tree/tree';
import { BinaryOp } from './compiler/model/binaryOperation';
import { DrawTree } from './tree/draw-tree';
import { Interpreter } from './compiler/part-6/interpretor';
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;


let str = '14 + 2 * (3 - 6) / 2';
// const lex = new Lexer(str);

// const intr = new Interpreter(lex);
// const res = intr.expr();
// console.log(res);



console.log('>>>>>>PART 7>>>>>>>>>>');

const lex7 = new Lexer(str);

const parser = new Parser(lex7);

// const ast = parser.parse();

// console.table('AST >>>>>', ast)

const interpreter = new Interpreter(parser);
const result = interpreter.interpret();

console.log(`Result of expression : ${result} `)






// console.log('>>>>>>>>TREE DATA >>>>>>>>');

// const tree = new Tree();

// const treeData = tree.getHierarchy(ast as BinaryOp);

// // console.log(JSON.stringify(treeData));

// const drawTree = new DrawTree(treeData);
// drawTree.draw();



