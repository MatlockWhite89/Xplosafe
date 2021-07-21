export interface TokenStateResponse {
  id: number;
  state: string;
}

export class TokenState {
  // tslint:disable:variable-name
  id: number;
  state: string;

  constructor() {
    this.id = null;
    this.state = null;
  }

  getId(): number { return this.id; }
  getState(): string { return this.state; }

  setId(value: number): void { this.id = value; }
  setState(value: string): void { this.state = value; }
}
