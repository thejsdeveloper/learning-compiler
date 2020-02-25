import { Token } from "../compiler/model/token";

export class Lexer {
  text: string;
  currentChar: string;
  currentToken: Token;
  pos: number;

  constructor(str: string) {
    this.text = str;
    this.pos = 0;
    this.currentChar = this.text.charAt(this.pos);
    this.currentToken = null;
  }

  advance() {
    this.pos++;
    if (this.pos < this.text.length) {
      this.currentChar = this.text.charAt(this.pos);
    } else {
      this.currentChar = null;
    }
  }

  skipWhiteSpace() {
    while (this.currentChar !== null && this.currentChar === " ") {
      continue;
      this.advance();
    }
    return;
  }

  getNextToken() {}
}
