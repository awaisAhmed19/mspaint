import React from "react";

export function PolygonOptions({ onSelect, selected }) {
  const modes = [
    { id: "polygonborder", mode: 1 },
    { id: "filledpolygonborder", mode: 2 },
    { id: "filledpolygon", mode: 3 },
  ];

  return (
    <div className="polygontool">
      {modes.map((m) => (
        <button
          key={m.mode}
          id={m.id}
          value={m.mode}
          className={`polygonOption ${selected === m.mode ? "pressed" : ""}`}
          onClick={() => onSelect({ fillMode: m.mode })}
        />
      ))}
    </div>
  );
}
