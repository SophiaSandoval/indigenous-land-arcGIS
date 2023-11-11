import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "esri-leaflet-proj",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
