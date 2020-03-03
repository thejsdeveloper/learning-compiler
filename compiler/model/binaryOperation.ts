import { AST } from "./ast";
import { TOKEN_TYPE, Token } from "./token";


export class BinaryOp extends AST {
  constructor(public left: AST, public token: Token, public right: AST) {
    super();
  }
}

export class Num extends AST {
  value: number;
  constructor(public token: Token){
    super();
    this.value = parseFloat(this.token.value);
  }
}

export class UnaryOp extends AST {
  constructor(public token: Token, public expr: any) { super(); }
}