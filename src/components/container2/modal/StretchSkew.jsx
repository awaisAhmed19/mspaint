import React from "react";

class StretchSkewDialog extends React.Component {
  state = {
    stretchX: 100,
    stretchY: 100,
    skewX: 0,
    skewY: 0,
  };

  handleChange = (key) => (e) => {
    this.setState({ [key]: Number(e.target.value) });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { stretchX, stretchY, skewX, skewY } = this.state;

    this.props.dispatchCommand("IMAGE_APPLY_STRETCH_SKEW", {
      stretchX,
      stretchY,
      skewX,
      skewY,
    });

    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    const { stretchX, stretchY, skewX, skewY } = this.state;

    return (
      <div className="window">
        <div className="window-titlebar" style={{ touchAction: "none" }}>
          <div className="window-title-area">
            <span className="window-title">Stretch and Skew</span>
          </div>
          <button
            className="window-close-button window-button"
            aria-label="Close window"
            onClick={onClose}
          />
        </div>

        <div className="window-content">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Stretch</legend>

              <div className="radio-wrapper">
                <label>Horizontal:</label>
                <input
                  type="number"
                  min={1}
                  max={5000}
                  value={stretchX}
                  onChange={this.handleChange("stretchX")}
                />
                %
              </div>

              <div className="radio-wrapper">
                <label>Vertical:</label>
                <input
                  type="number"
                  min={1}
                  max={5000}
                  value={stretchY}
                  onChange={this.handleChange("stretchY")}
                />
                %
              </div>
            </fieldset>

            <fieldset>
              <legend>Skew</legend>

              <div className="radio-wrapper">
                <label>Horizontal:</label>
                <input
                  type="number"
                  min={-90}
                  max={90}
                  value={skewX}
                  onChange={this.handleChange("skewX")}
                />
                °
              </div>

              <div className="radio-wrapper">
                <label>Vertical:</label>
                <input
                  type="number"
                  min={-90}
                  max={90}
                  value={skewY}
                  onChange={this.handleChange("skewY")}
                />
                °
              </div>
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

export default StretchSkewDialog;
