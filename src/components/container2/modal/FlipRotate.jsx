import React from "react";

class FlipRotateDialog extends React.Component {
  state = {
    mode: "flip-horizontal",
    angle: 90,
  };

  handleModeChange = (e) => {
    this.setState({ mode: e.target.value });
  };

  handleAngleChange = (e) => {
    this.setState({ angle: Number(e.target.value) });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { mode, angle } = this.state;

    this.props.dispatchCommand("IMAGE_APPLY_FLIP_ROTATE", {
      mode,
      angle,
    });

    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    const { mode, angle } = this.state;
    const isRotate = mode === "rotate-by-angle";

    return (
      <div className="window">
        <div className="window-titlebar" style={{ touchAction: "none" }}>
          <div className="window-title-area">
            <span className="window-title">Flip and Rotate</span>
          </div>
          <button
            className="window-close-button window-action-close window-button"
            aria-label="Close window"
            onClick={onClose}
          />
        </div>

        <div className="window-content" tabIndex={-1}>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Flip or rotate</legend>

              <div className="radio-wrapper">
                <input
                  type="radio"
                  name="flip-or-rotate"
                  value="flip-horizontal"
                  checked={mode === "flip-horizontal"}
                  onChange={this.handleModeChange}
                />
                <label>Flip horizontal</label>
              </div>

              <div className="radio-wrapper">
                <input
                  type="radio"
                  name="flip-or-rotate"
                  value="flip-vertical"
                  checked={mode === "flip-vertical"}
                  onChange={this.handleModeChange}
                />
                <label>Flip vertical</label>
              </div>

              <div className="radio-wrapper">
                <input
                  type="radio"
                  name="flip-or-rotate"
                  value="rotate-by-angle"
                  checked={mode === "rotate-by-angle"}
                  onChange={this.handleModeChange}
                />
                <label>Rotate by angle</label>
              </div>

              <div className="sub-options">
                {[90, 180, 270].map((deg) => (
                  <div className="radio-wrapper" key={deg}>
                    <input
                      type="radio"
                      name="rotate-angle"
                      value={deg}
                      disabled={!isRotate}
                      checked={angle === deg}
                      onChange={this.handleAngleChange}
                    />
                    <label>{deg}°</label>
                  </div>
                ))}
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

export default FlipRotateDialog;
