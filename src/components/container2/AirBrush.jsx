export function AirBrushOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3];

  return (
    <div className="AirBrushOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`AirB${s}px`}
          className={`airOptions ${selected === s ? "pressed" : ""}`}
          value={s}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
