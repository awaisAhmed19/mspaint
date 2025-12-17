export function CurveLineOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3, 4, 5];

  return (
    <div className="CurvedLineOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`Line${s}px`}
          className={`Loptions ${selected === s ? "pressed" : ""}`}
          value={s}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
