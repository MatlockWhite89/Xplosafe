export interface LocationResponseData {
  id?: number;
  country?: string;
  state?: string;
  city?: string;
  base?: string;
}

export class DatabaseModelLocation {
  id?: number;
  country?: string;
  state?: string;
  city?: string;
  base?: string;

  constructor() {
    this.id = null;
    this.country = null;
    this.state = null;
    this.city = null;
    this.base = null;
  }

  // Getters
  getId(): number
  {
    return this.id;
  }

  getCountry(): string
  {
    return this.country;
  }

  getState(): string
  {
    return this.state;
  }

  getCity(): string
  {
    return this.city;
  }

  getBase(): string
  {
    return this.base;
  }

  // Setters
  setId(newId: number): void
  {
    this.id = newId;
  }

  setCountry(countryName: string): void
  {
    this.country = countryName;
  }

  setState(stateName: string): void
  {
    this.state = stateName;
  }

  setCity(cityName: string): void
  {
    this.city = cityName;
  }

  setBase(baseName: string): void
  {
    this.base = baseName;
  }
}
