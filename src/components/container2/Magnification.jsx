import React from "react";

export function MagnificationOptions({ onSelect, selected }) {
  const zoomLevels = [1, 2, 6, 8];

  return (
    <div className="MagnificationOptions">
      {zoomLevels.map((z) => (
        <button
          key={z}
          id={`Mag${z}x`}
          value={z}
          className={`magOption ${selected === z ? "pressed" : ""}`}
          onClick={() => onSelect({ zoom: z })}
        />
      ))}
    </div>
  );
}
