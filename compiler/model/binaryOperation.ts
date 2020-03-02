import { AST } from "./ast";
import { TOKEN_TYPE, Token } from "./token";


export class BinaryOp extends AST {
  constructor(public left: BinaryOp, public token: Token, public right: BinaryOp) {
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