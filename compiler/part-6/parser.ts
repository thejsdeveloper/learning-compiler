import { Lexer } from "./lexer";
import { TOKEN_TYPE, Token } from "../model/token";

export class Parser {
  currentToken: Token;
  constructor(private lexer: Lexer) {
    this.currentToken = null;
  }

  eat(tokenType: TOKEN_TYPE) {
    if (this.currentToken.tokenType === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      throw Error("Error while parsing");
    }
  }

  factor() {}

  term() {
    const node = this.factor();

    while (
      this.currentToken.tokenType === TOKEN_TYPE.MUL ||
      this.currentToken.tokenType === TOKEN_TYPE.DIV
    ) {
      if (this.currentToken.tokenType === TOKEN_TYPE.MUL) {

        const token = this.currentToken;
        
      }

      if (this.currentToken.tokenType === TOKEN_TYPE.MUL) {
      }
    }
  }

  expr() {
    const node = this.term();
  }
}
