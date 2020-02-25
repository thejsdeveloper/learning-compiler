export enum TOKEN_TYPE {
  "INTEGER" = "INTEGER",
  "PLUS" = "PLUS",
  "MINUS" = "MINUS",
  'MUL' = 'MUL',
  'DIV' = 'DIV',
  "EOF" = "EOF"
}

export function isDigit(value: any) {
  return !isNaN(parseFloat(value));
}

export class Token {
  type: TOKEN_TYPE;
  value: string;

  constructor(type: TOKEN_TYPE, value: string) {
    this.type = type;
    this.value = value;
  }
}

export class Interpreter {
  text: string;
  pos: number;
  currentToken: Token;
  currentChar: string;

  constructor(expr: string) {
    this.text = expr;

    this.currentToken = null;
    this.pos = 0;
    this.currentChar = this.text.charAt(this.pos);
  }

  error(): Error {
    throw Error("Error while parsing input");
  }

  advance() {
    this.pos += 1;

    if (this.pos > this.text.length - 1) {
      this.currentChar = null;
    } else {
      this.currentChar = this.text.charAt(this.pos);
    }
  }

  skipWhiteSpace() {
    while(this.currentChar !== null && this.currentChar === ' ') {
      this.advance();
    }
  }


  integer(): string {
    let num = '';
    while(this.currentChar !== null &&  isDigit(this.currentChar)) {
      num += this.currentChar;
      this.advance();
    }

    return num;
  }


  getNextToken(): Token {

  
    while(this.currentChar !== null) {

      if(this.currentChar === ' ') {
        this.skipWhiteSpace()
        continue;
      }

      if(isDigit(this.currentChar)) {
        return new Token(TOKEN_TYPE.INTEGER, this.integer())
      }

      if(this.currentChar === '+') {
        this.advance();
        return new Token(TOKEN_TYPE.PLUS, '+')
      }

      if(this.currentChar === '-') {
        this.advance();
        return new Token(TOKEN_TYPE.MINUS, '-')
      }

      if(this.currentChar === '*') {
        this.advance();
        return new Token(TOKEN_TYPE.MUL, '*')
      }

      if(this.currentChar === '/') {
        this.advance();
        return new Token(TOKEN_TYPE.DIV, '/')
      }

      throw new Error('Exception While Parsing');
    }

    return new Token(TOKEN_TYPE.EOF, null);

  }


  eat(tokenType: TOKEN_TYPE) {
    if(this.currentToken.type === tokenType) {
      this.currentToken = this.getNextToken()
    } else {
     throw new Error('Exception While Parsing');
    }
  }


  expr() {


    this.currentToken = this.getNextToken();
    const left = this.currentToken;
    this.eat(TOKEN_TYPE.INTEGER);

    const op = this.currentToken;

    if(op.type === TOKEN_TYPE.PLUS) {
      this.eat(TOKEN_TYPE.PLUS);
    } else {
      this.eat(TOKEN_TYPE.MINUS);
    }


    const right = this.currentToken;
    this.eat(TOKEN_TYPE.INTEGER);


    if(op.type === TOKEN_TYPE.PLUS) {
      return parseFloat(left.value) + parseFloat(right.value);
    } else {
      return parseFloat(left.value) - parseFloat(right.value);
    }
  }

}
