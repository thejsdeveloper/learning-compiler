import { Token, TOKEN_TYPE } from "../model/token";
import { isDigit } from "../utility/utility";
export class Lexer {
  currentChar: string;
  pos: number;
  constructor(private text: string) {
    this.pos = 0;
    this.currentChar = this.text.charAt(this.pos);
  }

  advance() {
    if (this.pos < this.text.length - 1) {
      this.pos++;
      this.currentChar = this.text.charAt(this.pos);
    } else {
      this.currentChar = null;
    }
  }

  skipWhiteSpace() {
    if (this.currentChar === " ") {
      this.advance();
    }
  }

  getNextToken(): Token {

    while (this.currentChar !== null) {
      if (this.currentChar === " ") {
        this.skipWhiteSpace();
        continue;
      }

      if (isDigit(this.currentChar)) {
        let wholeDigit = "";
        while (this.currentChar !== null && isDigit(this.currentChar)) {
          wholeDigit = wholeDigit + this.currentChar;
          this.advance();
        }

        return new Token(TOKEN_TYPE.INTEGER, wholeDigit);
      }

      if (this.currentChar === "+") {
        this.advance();
        return new Token(TOKEN_TYPE.PLUS, "+");
      }

      if (this.currentChar === "-") {
        this.advance();
        return new Token(TOKEN_TYPE.MINUS, "-");
      }

      if (this.currentChar === "*") {
        this.advance();
        return new Token(TOKEN_TYPE.MUL, "*");
      }

      if (this.currentChar === "/") {
        this.advance();
        return new Token(TOKEN_TYPE.DIV, "/");
      }

      if (this.currentChar === "(") {
        this.advance();
        return new Token(TOKEN_TYPE.LPREN, "(");
      }

      if (this.currentChar === ")") {
        this.advance();
        return new Token(TOKEN_TYPE.RPREN, ")");
      }

      throw new Error("Error while parsing at position " + this.pos);
    }

    return new Token(TOKEN_TYPE.EOF, null);
  }
}
