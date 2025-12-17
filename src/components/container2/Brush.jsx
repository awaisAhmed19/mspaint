export function BrushOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="BrushOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`BrushOption${s}`}
          className={`brushOption ${selected === s ? "pressed" : ""}`}
          value={s}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
