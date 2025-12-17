import React from "react";

export function LineOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3, 4, 5];

  return (
    <div className="LineOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`Line${s}px`}
          value={s}
          className={`Loptions ${selected === s ? "pressed" : ""}`}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
