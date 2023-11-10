const apiKey =
  "AAPKffd34b357b0648399c884c2f4d981aebxvWm4FC1ERRchR_PGPa9dbOsS74-YvOqazxjhETHb4BMZoxdbULSZEHjo0ST4dSM";

const basemapEnum = "ArcGIS:Imagery";

import axios from "axios";
import { vectorBasemapLayer } from "esri-leaflet-vector";
import * as L from "leaflet";

const polygons: L.Polygon[] = [];
let properties: Property[] = [];

interface Property {
  name: string;
  color: string;
  geometry: any[];
}

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
    properties = [];
    console.log(res.data);

    polygons.forEach((p) => {
      p.remove();
    });

    res.data.forEach((territory: any) => {
      const property: Property = {
        name: territory.properties.Name,
        color: territory.properties.color,
        geometry: territory.geometry.coordinates[0],
      };

      properties.push(property);

      const coords = property.geometry.map((data: any) => {
        return new L.LatLng(data[1], data[0]);
      });

      console.log(coords);

      const polygon = L.polygon(coords, {
        color: property.color,
      });

      polygons.push(polygon);

      polygon.addTo(map);
    });

    let htmlElement = "<div>";

    properties.forEach((p) => {
      htmlElement += `
            <p>
                <span style="display: inline-block; width: 10px; height: 10px; background-color: ${p.color}; margin-right: 5px;"></span>
                ${p.name}
            </p>
        `;
    });

    htmlElement += "</div>";
    // tooltip?.remove();
    // tooltip = L.marker([lat, lng]);
    const popup = L.popup()
      .setLatLng([lat, lng])
      .setContent(htmlElement)
      .openOn(map)
      .openPopup();
    // tooltip.addTo(map).bindPopup(names).openPopup();
  });

  return map;
};
