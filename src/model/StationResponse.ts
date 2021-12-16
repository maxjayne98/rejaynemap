export interface Station {
    name: string;
    time: Date;
}

export interface StationResponse {
    lat: number;
    lon: number;
    uid: number;
    aqi: string;
    station: Station;
}

