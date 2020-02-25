import { Token, TOKEN_TYPE } from '../model/token';
import { isDigit } from '../parser-part-3';

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
    while (this.currentChar !== null && this.currentChar === ' ') {
      this.advance();
    }
  }

  getNextToken(): Token {

    while (this.currentChar !== null) {

      if (this.currentChar === ' ') {
        this.skipWhiteSpace();
        continue;
      }

      if (isDigit(this.currentChar)) {
        let wholeDigit = '';
        while (this, this.currentChar !== null && isDigit(this.currentChar)) {
          wholeDigit = wholeDigit + this.currentChar;
          this.advance();
        }

        return new Token(TOKEN_TYPE.INTEGER, wholeDigit);
      }

      if (this.currentChar === '+') {
        return new Token(TOKEN_TYPE.PLUS, '+');
      }

      if (this.currentChar === '-') {
        return new Token(TOKEN_TYPE.MINUS, '-');
      }

      if (this.currentChar === '*') {
        return new Token(TOKEN_TYPE.MUL, '*');
      }

      if (this.currentChar === '/') {
        return new Token(TOKEN_TYPE.DIV, '/');
      }

      throw new Error('Error while parsing at position ' + this.pos);

    }

    return new Token(TOKEN_TYPE.EOF, null);

  }

}
