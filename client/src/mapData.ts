import { divIcon } from 'leaflet'
import type { LatLngExpression } from 'leaflet'

export const cityCoordinates: Record<string, LatLngExpression> = {
  Alibag: [18.64, 72.87],
  Alleppey: [9.5, 76.33],
  Coonoor: [11.35, 76.8],
  Darjeeling: [27.04, 88.26],
  Goa: [15.49, 73.83],
  Jaipur: [26.91, 75.79],
  Kasauli: [30.9, 76.97],
  Manali: [32.24, 77.19],
  Munnar: [10.09, 77.06],
  Pondicherry: [11.94, 79.81],
  Rishikesh: [30.09, 78.27],
  Shimla: [31.1, 77.17],
}

export const markerIcon = divIcon({
  className: 'map-marker',
  html: '<span></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
})
