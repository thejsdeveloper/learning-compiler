import { Lexer } from "./lexer";
import { Token, TOKEN_TYPE } from "../model/token";



export class Interpreter {
  currentToken: Token;
  constructor(private lexer: Lexer) {
    this.currentToken = this.lexer.getNextToken();
  }


  expr() {
    let result = this.factor();

    while( 
      this.currentToken.tokenType !== TOKEN_TYPE.EOF && 
      ( this.currentToken.tokenType === TOKEN_TYPE.MUL ||
      this.currentToken.tokenType === TOKEN_TYPE.DIV )
      ) {
        const token = this.currentToken;

        if (token.tokenType === TOKEN_TYPE.MINUS) {
          this.eat(TOKEN_TYPE.MUL);
          result = result * this.factor();
        }

        if (token.tokenType === TOKEN_TYPE.DIV) {
          this.eat(TOKEN_TYPE.DIV);
          result = result / this.factor();
        }
    }
    return result;
  }

  factor(): number {
    const token =  this.currentToken;
    this.eat(TOKEN_TYPE.INTEGER);
    return parseFloat(token.value);
  }

  eat(tokenType: TOKEN_TYPE) {
    const token = this.currentToken;

    if (token.tokenType === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    }

    throw new Error('Error while parsing');
  }
}