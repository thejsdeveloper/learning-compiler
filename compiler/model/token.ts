export enum TOKEN_TYPE {
  "INTEGER" = "INTEGER",
  "PLUS" = "PLUS",
  "MINUS" = "MINUS",
  "MUL" = "MUL",
  "DIV" = "DIV",
  "EOF" = "EOF"
}

export class Token {
  tokenType: TOKEN_TYPE;
  value: string;

  constructor(tokenType: TOKEN_TYPE, value: string) {
    this.tokenType = tokenType;
    this.value = value;
  }
}
