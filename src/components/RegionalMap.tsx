import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import romaniaMap from "../utils/ro_judete_poligon.json";
import type { Organization } from "../lib/types";

export default function RegionalMap({
  organizations,
  setHoveredRegion,
  handleMouseMove,
}: {
  organizations: Organization[];
  setHoveredRegion: (name: string | null) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
}) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 5000, center: [25, 45.75] }}
      width={1000}
      height={800}
      style={{ width: "100%", height: "100%" }}
    >
      <Geographies geography={romaniaMap}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const orgsInRegion = organizations.filter(
              (org) => (org.region?.toUpperCase() || "") === geo.properties.name.toUpperCase(),
            );
            const has = orgsInRegion.length > 0;
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={has ? "#5B8FFF" : "#EEF0F5"}
                stroke="#ffffff"
                strokeWidth={1.2}
                style={{
                  default: { outline: "none" },
                  hover: { fill: has ? "#FE558E" : "#E4E7EE", outline: "none", cursor: has ? "pointer" : "default" },
                  pressed: { outline: "none" },
                }}
                onMouseEnter={(e) => {
                  if (has) {
                    setHoveredRegion(geo.properties.name);
                    handleMouseMove(e as unknown as React.MouseEvent);
                  }
                }}
                onMouseMove={(e) => {
                  if (has) handleMouseMove(e as unknown as React.MouseEvent);
                }}
                onMouseLeave={() => setHoveredRegion(null)}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
