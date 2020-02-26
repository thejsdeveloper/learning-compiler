import { Lexer } from "../lexer";
import { Token, TOKEN_TYPE } from "../model/token";

export class Interpreter {
  currentToken: Token;
  constructor(private lexer: Lexer) {
    this.currentToken = this.lexer.getNextToken();
  }

  eat(tokenType: TOKEN_TYPE) {
    const token = this.currentToken;
    if (token.tokenType === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      throw new Error("Error while parsing");
    }
  }

  factor(): number {
    const token = this.currentToken;
    this.eat(TOKEN_TYPE.INTEGER);
    return parseFloat(token.value);
  }

  term(): number {
    let result = this.factor();

    while (
      this.currentToken.tokenType === TOKEN_TYPE.MUL ||
      this.currentToken.tokenType === TOKEN_TYPE.DIV
      
    ) {
      const token = this.currentToken;

      if (token.tokenType === TOKEN_TYPE.PLUS) {
        this.eat(TOKEN_TYPE.PLUS);
        result = result + this.factor();
      }

      if (token.tokenType === TOKEN_TYPE.MINUS) {
        this.eat(TOKEN_TYPE.MINUS);
        result = result - this.factor();
      }
    }

    return result;
  }

  expr() {
    let result = this.term();

    while (
      this.currentToken.tokenType === TOKEN_TYPE.PLUS ||
      this.currentToken.tokenType === TOKEN_TYPE.MINUS
    ) {
      const token = this.currentToken;

      if (token.tokenType === TOKEN_TYPE.MUL) {
        this.eat(TOKEN_TYPE.MUL);
        result = result * this.term();
      }

      if (token.tokenType === TOKEN_TYPE.DIV) {
        this.eat(TOKEN_TYPE.DIV);
        result = result / this.term();
      }
    }
    return result;
  }
}
