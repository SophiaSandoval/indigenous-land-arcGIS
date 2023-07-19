const apiKey =
  "AAPKffd34b357b0648399c884c2f4d981aebxvWm4FC1ERRchR_PGPa9dbOsS74-YvOqazxjhETHb4BMZoxdbULSZEHjo0ST4dSM";

const basemapEnum = "ArcGIS:Imagery";

import axios from "axios";
import { vectorBasemapLayer } from "esri-leaflet-vector";
import * as L from "leaflet";

let tooltip: L.Marker<any> | null = null;
let polygon: L.Polygon | null = null;

export const init = (mapView: HTMLDivElement) => {
  const map = L.map(mapView, {
    minZoom: 2,
  });
  map.setView([34.02, -118.805], 13);
  vectorBasemapLayer(basemapEnum, { apiKey }).addTo(map);

  map.on("click", async (event) => {
    const { lat, lng } = event.latlng;
    console.log(lat, lng);
    const res = await axios.get(
      `https://native-land.ca/wp-json/nativeland/v1/api/index.php?maps=languages&position=${lat},${lng}`
    );
    console.log(res.data[0].properties.Name);

    tooltip?.remove();
    tooltip = L.marker([lat, lng]);
    tooltip.addTo(map).bindPopup(res.data[0].properties.Name).openPopup();

    const coords = res.data[0].geometry.coordinates[0].map((data: any) => {
      return new L.LatLng(data[1], data[0]);
    });

    polygon?.remove();
    polygon = L.polygon(coords, {
      color: "red",
    });
    polygon.addTo(map);
  });

  return map;
};
