export interface MethodResponse {
  id: number;
  method_name: string;
  method_code: string;
}

export class Method {
  // tslint:disable:variable-name
  id: number;
  method_name: string;
  method_code: string;

  constructor() {
    this.id = null;
    this.method_name = null;
    this.method_code = null;
  }

  getId(): number { return this.id; }
  getMethodName(): string { return this.method_name; }
  getMethodCode(): string { return this.method_code; }

  setId(value: number): void { this.id = value; }
  setMethodName(value: string): void { this.method_name = value; }
  setMethodCode(value: string): void { this.method_code = value; }
}
