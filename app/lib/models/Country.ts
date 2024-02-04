export type Country = {
    name: string
    continent: string;
}

export type CountryData = {
    [key: string]: Country;
  }