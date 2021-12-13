export interface Station {
    name: string;
    time: Date;
}

export interface StationsResponse {
    lat: number;
    lon: number;
    uid: number;
    aqi: string;
    station: Station;
}

