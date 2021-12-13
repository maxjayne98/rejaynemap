import { LngLatLike } from 'mapbox-gl'
export interface FeatureCollection {
    type: string
    geometry: {
        type: string,
        coordinates: LngLatLike
    }
    properties: {
        id: Number
        name: string
        description: string
    }


}