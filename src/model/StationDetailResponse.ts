export interface Attribution {
  url: string;
  name: string;
  logo: string;
}

export interface City {
  geo: number[];
  name: string;
  url: string;
}

export interface H {
  v: number;
}

export interface No2 {
  v: number;
}

export interface O3 {
  v: number;
}

export interface P {
  v: number;
}

export interface Pm10 {
  v: number;
}

export interface Pm25 {
  v: number;
}

export interface T {
  v: number;
}

export interface W {
  v: number;
}

export interface Wg {
  v: number;
}

export interface Iaqi {
  h: H;
  no2: No2;
  o3: O3;
  p: P;
  pm10: Pm10;
  pm25: Pm25;
  t: T;
  w: W;
  wg: Wg;
}

export interface Time {
  s: string;
  tz: string;
  v: number;
  iso: Date;
}

export interface O32 {
  avg: number;
  day: string;
  max: number;
  min: number;
}

export interface Pm102 {
  avg: number;
  day: string;
  max: number;
  min: number;
}

export interface Pm252 {
  avg: number;
  day: string;
  max: number;
  min: number;
}

export interface Uvi {
  avg: number;
  day: string;
  max: number;
  min: number;
}

export interface Daily {
  o3: O32[];
  pm10: Pm102[];
  pm25: Pm252[];
  uvi: Uvi[];
}

export interface Forecast {
  daily: Daily;
}

export interface Debug {
  sync: Date;
}

export interface StationDetailResponse {
  aqi: number;
  idx: number;
  attributions: Attribution[];
  city: City;
  dominentpol: string;
  iaqi: Iaqi;
  time: Time;
  forecast: Forecast;
  debug: Debug;
}
