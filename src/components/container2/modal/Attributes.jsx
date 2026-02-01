import React from "react";

class AttributesDialog extends React.Component {
  constructor(props) {
    super(props);

    const { canvasInfo } = props;

    this.state = {
      width: canvasInfo?.width ?? 0,
      height: canvasInfo?.height ?? 0,
      units: "px",
      colors: "polychrome",
      transparency: "opaque",
    };
  }

  componentDidMount() {
    const { canvasInfo } = this.props;

    // 🔒 only set if constructor couldn’t
    if (this.state.width === 0 && canvasInfo?.width) {
      this.setState({
        width: canvasInfo.width,
        height: canvasInfo.height,
      });
    }
  }

  handleChange = (key) => (e) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.dispatchCommand("IMAGE_APPLY_ATTRIBUTES", {
      ...this.state,
    });

    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    const { width, height, units, colors, transparency } = this.state;

    return (
      <div className="window">
        <div className="window-titlebar">
          <span className="window-title">Attributes</span>
          <button className="window-close-button" onClick={onClose} />
        </div>

        <div className="window-content">
          <form onSubmit={this.handleSubmit}>
            <label>
              Width:
              <input
                type="number"
                min={1}
                value={width}
                onChange={this.handleChange("width")}
              />
            </label>

            <label>
              Height:
              <input
                type="number"
                min={1}
                value={height}
                onChange={this.handleChange("height")}
              />
            </label>

            <fieldset>
              <legend>Units</legend>
              {["px", "in", "cm"].map((u) => (
                <label key={u}>
                  <input
                    type="radio"
                    value={u}
                    checked={units === u}
                    onChange={this.handleChange("units")}
                  />
                  {u}
                </label>
              ))}
            </fieldset>

            <fieldset>
              <legend>Colors</legend>
              {["polychrome", "monochrome"].map((c) => (
                <label key={c}>
                  <input
                    type="radio"
                    value={c}
                    checked={colors === c}
                    onChange={this.handleChange("colors")}
                  />
                  {c}
                </label>
              ))}
            </fieldset>

            <fieldset>
              <legend>Transparency</legend>
              {["opaque", "transparent"].map((t) => (
                <label key={t}>
                  <input
                    type="radio"
                    value={t}
                    checked={transparency === t}
                    onChange={this.handleChange("transparency")}
                  />
                  {t}
                </label>
              ))}
            </fieldset>

            <div className="button-group">
              <button type="submit">OK</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AttributesDialog;
