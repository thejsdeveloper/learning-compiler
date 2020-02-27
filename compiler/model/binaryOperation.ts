import { AST } from "./ast";
import { TOKEN_TYPE, Token } from "./token";


export class BinaryOp extends AST {
  constructor(private left: AST, private token: Token, private right: AST) {
    super();
  }
}

export class Num extends AST {
  value: string;
  constructor(private token: Token){
    super();
    this.value = this.token.value;
  }
}