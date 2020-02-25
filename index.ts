// Import stylesheets
import './style.css';


// import {Interpreter} from './simple-add-parser';

import { Interpreter } from './compiler/parser-part-3';
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;


let str = '1 + 2 + 1 - 7';

const intr = new Interpreter(str);
const res = intr.expr();

console.log(res);


