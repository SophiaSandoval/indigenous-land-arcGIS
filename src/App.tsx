import { useEffect, useRef } from "react";
import { init } from "./esrimap";
import { Map } from "leaflet";

function App() {
  const mapViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: null | Map = null;
    if (mapViewRef.current) {
      map = init(mapViewRef.current);
    }
    return () => {
      map?.remove();
    };
  }, [mapViewRef]);

  return (
    <div className="">
      <div
        style={{
          background: "red",
          border: "2px",
          width: "100%",
          height: "100%",
          right: 0,
          position: "fixed",
          textAlign: "center",
          fontSize: "25px",
          fontFamily: "Avenir Next",
          fontWeight: "400",
        }}
      >
        Hello world
      </div>
      <div
        style={{
          height: 800,
          width: "100%",
          position: "fixed",
          left: 0,
          top: 35,
          bottom: 0,
        }}
        ref={mapViewRef}
      ></div>
    </div>
  );
}

export default App;
