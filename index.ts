// Import stylesheets
import './style.css';


// import {Interpreter} from './simple-add-parser';


import { Lexer } from './compiler/part-4/lexer';
import { Interpreter } from './compiler/part-4/interpreter';
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;


let str = '5 * 4 / 2';
const lex = new Lexer(str);

const intr = new Interpreter(lex);
const res = intr.expr();
console.log(res);


