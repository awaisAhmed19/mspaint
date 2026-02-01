import React from "react";

class SaveColorsDialog extends React.Component {
  state = {
    fileName: "",
    fileType: "RIFF_PALETTE",
  };

  handleFileNameChange = (e) => {
    this.setState({ fileName: e.target.value });
  };

  handleFileTypeChange = (e) => {
    this.setState({ fileType: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { fileName, fileType } = this.state;

    this.props.dispatchCommand("COLOR_SAVE", {
      fileName,
      fileType,
    });

    this.props.onClose();
  };

  render() {
    const { onClose } = this.props;
    const { fileName, fileType } = this.state;

    return (
      <div className="window">
        {/* TITLE BAR */}
        <div className="window-titlebar" style={{ touchAction: "none" }}>
          <div className="window-title-area">
            <span className="window-title">Save Colors</span>
          </div>
          <button
            className="window-close-button window-action-close window-button"
            aria-label="Close window"
            onClick={onClose}
          />
        </div>

        {/* CONTENT */}
        <div className="window-content" tabIndex={-1}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                File name:
                <input
                  type="text"
                  className="file-name inset-deep"
                  value={fileName}
                  onChange={this.handleFileNameChange}
                />
              </label>

              <label>
                Save as type:
                <select
                  className="file-type-select inset-deep"
                  value={fileType}
                  onChange={this.handleFileTypeChange}
                >
                  <option value="RIFF_PALETTE">RIFF PAL (*.pal)</option>
                  <option value="GIMP_PALETTE">
                    GIMP palette (*.gpl;*.gimp;*.colors)
                  </option>
                  <option value="PAINT_SHOP_PRO_PALETTE">
                    Paint Shop Pro palette (*.psppalette;*.pal)
                  </option>
                  <option value="PAINTDOTNET_PALETTE">
                    Paint.NET palette (*.txt)
                  </option>
                  <option value="KDE_RGB_PALETTE">
                    KolourPaint palette (*.colors)
                  </option>
                  <option value="SKENCIL_PALETTE">
                    Skencil palette (*.spl)
                  </option>
                  <option value="SKETCH_JSON_PALETTE">
                    Sketch palette (*.sketchpalette)
                  </option>
                  <option value="SK1_PALETTE">sK1 palette (*.skp)</option>
                  <option value="ADOBE_SWATCH_EXCHANGE_PALETTE">
                    Adobe Swatch Exchange (*.ase)
                  </option>
                  <option value="STAROFFICE_PALETTE">
                    StarOffice Colors (*.soc)
                  </option>
                  <option value="CSS_VARIABLES">CSS variables (*.css)</option>
                  <option value="SCSS_VARIABLES">
                    SCSS variables (*.scss)
                  </option>
                  <option value="SASS_VARIABLES">
                    SASS variables (*.sass)
                  </option>
                  <option value="LESS_VARIABLES">
                    LESS variables (*.less)
                  </option>
                  <option value="STYLUS_VARIABLES">
                    Stylus variables (*.styl)
                  </option>
                  <option value="HOMESITE_PALETTE">
                    Homesite palette (*.hpl)
                  </option>
                  <option value="ADOBE_COLOR_SWATCH_PALETTE">
                    Adobe Color Swatch (*.aco)
                  </option>
                  <option value="ADOBE_COLOR_TABLE_PALETTE">
                    Adobe Color Table (*.act)
                  </option>
                  <option value="STARCRAFT_PALETTE">
                    StarCraft palette (*.pal)
                  </option>
                  <option value="STARCRAFT_PADDED">
                    StarCraft terrain palette (*.wpe)
                  </option>
                </select>
              </label>
            </div>

            {/* BUTTONS */}
            <div className="button-group">
              <button type="submit">Save</button>
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

export default SaveColorsDialog;
