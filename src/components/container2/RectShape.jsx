import React from "react";
export function RectShapeOptions({ selected, onSelect }) {
  const modes = [
    { id: "rectborder", mode: 1 },
    { id: "filledrectborder", mode: 2 },
    { id: "filledrect", mode: 3 },
  ];

  return (
    <div className="rectTool">
      {modes.map((m) => (
        <button
          key={m.mode}
          id={m.id}
          value={m.mode}
          className={`rectOption ${selected === m.mode ? "pressed" : ""}`}
          onClick={() => onSelect({ mode: m.mode })}
        />
      ))}
    </div>
  );
}
