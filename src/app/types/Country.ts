type NativeName = {
  official: string;
  common: string;
};

type LanguageMap = {
  [key: string]: string;
};

type Currency = {
  name: string;
  symbol: string;
};

type Translation = {
  official: string;
  common: string;
};

type TranslationsMap = {
  [key: string]: Translation;
};

type Demonyms = {
  f: string;
  m: string;
};

type Maps = {
  googleMaps: string;
  openStreetMaps: string;
};

type Gini = {
  [key: string]: number;
};

type Car = {
  signs: string[];
  side: string;
};

type Flag = {
  png: string;
  svg: string;
  alt?: string;
};

type CoatOfArms = {
  png: string;
  svg: string;
};

type PostalCode = {
  format: string;
  regex: string;
};

export type Country = {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: NativeName;
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [key: string]: Currency;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: LanguageMap;
  translations: TranslationsMap;
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: {
    [key: string]: Demonyms;
  };
  flag: string;
  maps: Maps;
  population: number;
  gini: Gini;
  fifa: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flag;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  };
  postalCode: PostalCode;
};
