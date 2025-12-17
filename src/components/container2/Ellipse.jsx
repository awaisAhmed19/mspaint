export function EllipseOptions({ onSelect, selected }) {
  const modes = [
    { id: "ellipseborder", mode: 1 },
    { id: "filledellipseborder", mode: 2 },
    { id: "filledellipse", mode: 3 },
  ];

  return (
    <div className="ellipsetool">
      {modes.map((m) => (
        <button
          key={m.mode}
          id={m.id}
          value={m.mode}
          className={`ellipseOption ${selected === m.mode ? "pressed" : ""}`}
          onClick={() => onSelect({ mode: m.mode })}
        />
      ))}
    </div>
  );
}
