import React from "react";

export function RectElipseOptions({ onSelect, selected }) {
  const modes = [
    { id: "roundedrect-border", mode: 1 },
    { id: "filled-roundedrect-border", mode: 2 },
    { id: "filled-roundedrect", mode: 3 },
  ];

  return (
    <div className="roundedrect-tool">
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
