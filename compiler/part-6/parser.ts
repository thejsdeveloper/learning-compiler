import { Lexer } from "./lexer";
import { TOKEN_TYPE, Token } from "../model/token";
import { BinaryOp, Num } from "../model/binaryOperation";
import { AST } from "../model/ast";

export class Parser {
  currentToken: Token;
  constructor(private lexer: Lexer) {
    this.currentToken = this.lexer.getNextToken();
  }

  eat(tokenType: TOKEN_TYPE) {
    if (this.currentToken.tokenType === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      throw Error("Error while parsing");
    }
  }

  factor(): AST {

    if (this.currentToken.tokenType === TOKEN_TYPE.INTEGER) {
      this.eat(TOKEN_TYPE.INTEGER);
      return new Num(this.currentToken);
    } else if (this.currentToken.tokenType === TOKEN_TYPE.LPREN) {
      this.eat(TOKEN_TYPE.LPREN);
      const node = this.expr();
      this.eat(TOKEN_TYPE.RPREN);
      return node;
    }


  }

  term(): AST {
    let node = this.factor();

    while (
      this.currentToken.tokenType === TOKEN_TYPE.MUL ||
      this.currentToken.tokenType === TOKEN_TYPE.DIV
    ) {
      const token = this.currentToken;
      if (token.tokenType === TOKEN_TYPE.MUL) {
        this.eat(TOKEN_TYPE.MUL);
      }

      if (token.tokenType === TOKEN_TYPE.MUL) {
        const token = this.currentToken;
        this.eat(TOKEN_TYPE.DIV);
      }

      node = new BinaryOp(node, token, this.factor());
    }

    return node;
  }

  expr(): AST {
    let node = this.term();

    while(
      this.currentToken.tokenType === TOKEN_TYPE.PLUS ||
      this.currentToken.tokenType === TOKEN_TYPE.MINUS
    ) {
        const token = this.currentToken;
        if(token.tokenType === TOKEN_TYPE.PLUS) {
          this.eat(TOKEN_TYPE.PLUS);
        }
        if(token.tokenType === TOKEN_TYPE.MINUS) {
          this.eat(TOKEN_TYPE.MINUS);
        }
        node = new BinaryOp(node, token, this.term());
    }

    return node;
  }

  parse(): AST {
    return this.expr();
  }
}
