export interface TokenTypeResponse {
  id: number;
  token_type_name: string;
}

export class TokenType {
  // tslint:disable:variable-name
  id: number;
  token_type_name: string;

  constructor() {
    this.id = null;
    this.token_type_name = null;
  }

  getId(): number { return this.id; }
  getTokenTypeName(): string { return this.token_type_name; }

  setId(value: number): void { this.id = value; }
  setTokenTypeName(value: string): void { this.token_type_name = value; }
}
