import React from "react";

const BASIC_COLORS = [
  "#FF8080",
  "#FFFF80",
  "#80FF80",
  "#00FF80",
  "#80FFFF",
  "#0080FF",
  "#FF80C0",
  "#FF80FF",
  "#FF0000",
  "#FFFF00",
  "#80FF00",
  "#00FF40",
  "#00FFFF",
  "#0080C0",
  "#8080C0",
  "#FF00FF",
  "#804040",
  "#FF8040",
  "#00FF00",
  "#008080",
  "#004080",
  "#8080FF",
  "#800040",
  "#FF0080",
  "#800000",
  "#FF8000",
  "#008000",
  "#008040",
  "#0000FF",
  "#0000A0",
  "#800080",
  "#8000FF",
  "#400000",
  "#804000",
  "#004000",
  "#004040",
  "#000080",
  "#000040",
  "#400040",
  "#400080",
  "#000000",
  "#808000",
  "#808040",
  "#808080",
  "#408080",
  "#C0C0C0",
  "#400040",
  "#FFFFFF",
];

const SWATCH_STYLE = {
  width: 16,
  height: 13,
  boxSizing: "border-box",
  borderTop: "1px solid rgb(44,44,44)",
  borderLeft: "1px solid rgb(44,44,44)",
  borderRight: "1px solid rgb(238,238,238)",
  borderBottom: "1px solid rgb(238,238,238)",
};

const COLLAPSED_WIDTH = 220;
const EXPANDED_WIDTH = 430;

function LabelInput({ label, hotkey, x = 0, y }) {
  return (
    <>
      <label
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 40,
        }}
      >
        <span>
          {label.replace(hotkey, "")}
          <span className="menu-hotkey">{hotkey}</span>
        </span>
      </label>
      <input
        className="inset-deep"
        style={{
          position: "absolute",
          left: x + 43,
          top: y,
          width: 21,
        }}
      />
    </>
  );
}
class EditColorsDialog extends React.Component {
  state = {
    showCustom: false,
    customColors: new Array(16).fill("#FFFFFF"),
  };

  toggleCustom = () => {
    this.setState({ showCustom: true });
  };

  render() {
    const { onClose } = this.props;
    const { showCustom, customColors } = this.state;

    return (
      <div
        className="window"
        style={{
          width: showCustom ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
          height: 360,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TITLEBAR */}
        <div className="window-titlebar" style={{ height: 18 }}>
          <div className="window-title-area">
            <span className="window-title">Edit Colors</span>
          </div>
          <button
            className="window-close-button window-action-close window-button"
            onClick={onClose}
            aria-label="Close window"
          />
        </div>

        {/* CONTENT */}
        <div className="window-content" style={{ flex: 1, padding: 6 }}>
          <form>
            <div style={{ display: "flex", height: "100%" }}>
              {/* LEFT SIDE */}
              <div
                style={{ width: 200, paddingRight: 6, boxSizing: "border-box" }}
              >
                <label>
                  <span>
                    <span className="menu-hotkey">B</span>asic colors:
                  </span>
                </label>

                <div
                  className="color-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(8, 16px)",
                    gridAutoRows: "13px",
                    gap: 2,
                    marginBottom: 8,
                  }}
                >
                  {BASIC_COLORS.map((c, i) => (
                    <div
                      key={`basic-${i}`}
                      className="swatch inset-deep"
                      style={{ ...SWATCH_STYLE, backgroundColor: c }}
                    />
                  ))}
                </div>

                <label>
                  <span>
                    <span className="menu-hotkey">C</span>ustom colors:
                  </span>
                </label>

                <div
                  className="color-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(8, 16px)",
                    gridAutoRows: "13px",
                    gap: 2,
                    marginBottom: 8,
                  }}
                >
                  {customColors.map((c, i) => (
                    <div
                      key={`custom-${i}`}
                      className="swatch inset-deep"
                      style={{ ...SWATCH_STYLE, backgroundColor: c }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="define-custom-colors-button"
                  onClick={this.toggleCustom}
                  disabled={showCustom}
                >
                  <span>
                    <span className="menu-hotkey">D</span>efine Custom Colors
                    &gt;&gt;
                  </span>
                </button>

                <div className="button-group">
                  <button type="submit">OK</button>
                  <button type="button" onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE */}
              {showCustom && (
                <div
                  className="right-side"
                  style={{ width: 230, position: "relative" }}
                >
                  <div
                    className="color-values-panel"
                    style={{
                      position: "absolute",
                      left: 10,
                      top: 170,
                      display: "flex",
                      gap: 8,
                      marginTop: 10,
                    }}
                  >
                    {/* LEFT: result color canvas */}
                    <canvas
                      width={58}
                      height={40}
                      className="result-color-canvas inset-shallow"
                    />

                    {/* RIGHT: controls */}
                    <div
                      className="color-values-fields"
                      style={{ position: "relative", width: 170 }}
                    >
                      {/* HSL */}
                      <LabelInput label="Hue:" hotkey="e" y={0} />
                      <LabelInput label="Sat:" hotkey="S" y={22} />
                      <LabelInput label="Lum:" hotkey="L" y={44} />

                      {/* RGB */}
                      <LabelInput label="Red:" hotkey="R" y={0} x={80} />
                      <LabelInput label="Green:" hotkey="G" y={22} x={80} />
                      <LabelInput label="Blue:" hotkey="u" y={44} x={80} />
                    </div>
                  </div>
                  <canvas
                    width={175}
                    height={187}
                    className="rainbow-canvas inset-shallow"
                  />
                  <canvas
                    width={10}
                    height={187}
                    className="luminosity-canvas inset-shallow"
                  />

                  <button className="add-to-custom-colors-button" type="button">
                    <span>
                      <span className="menu-hotkey">A</span>dd To Custom Colors
                    </span>
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditColorsDialog;
