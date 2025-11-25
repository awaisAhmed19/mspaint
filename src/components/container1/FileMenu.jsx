import React from "react";

import Footer from "../container4/Footer";

class FileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.Filefootnote = {
      New_file: "Creates a new document.",
      Open_file: "Opens a existing document",
      Save_file: "Saves the active document",
      Saveas_file: "Saves the active document with a new name",
      Load_from_URL: "Opens an image from Web",
      Upload_to_Imgur: "Uploads the active document on imgur",
      Manage_storage: "Manage storage of previously created or open document",
      Set_as_WallpaperT: "Tiles this bitmap on the desktop backgorund",
      Set_as_WallpaperC: "Center this bitmap on the desktop backgorund",
      Recent_files: "List recent files",
      Exit: "Quits Paint.",
    };
  }
  handleEnter = (e) => {
    const id = e.currentTarget.id;

    if (this.Filefootnote[id]) {
      this.props.setFooter(this.Filefootnote[id]);
    } else {
      console.warn("No footnote found for:", id);
    }
  };

  handleLeave = () => {
    this.props.clearFooter();
  };
  render() {
    return (
      <div
        className="dropdown"
        id="file_toggle"
        style={{ width: "275px", height: "310px", left: "0" }}
      >
        <table
          className="toggle-content"
          style={{ width: "275px", height: "305px", left: "0" }}
        >
          <tbody>
            <tr
              className="menu-row"
              id="New_file"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">New</td>
              <td className="menu-item-shortcut">Ctrl+Alt+N</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Open_file"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Open</td>
              <td className="menu-item-shortcut">Ctrl+Alt+O</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Save_file"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Save</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Saveas_file"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">SaveAs</td>
              <td className="menu-item-shortcut">Ctrl+S</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            {/* React cannot use hx-get/hx-trigger/hx-target.
                Replace with React event handlers later. */}
            <tr
              className="menu-row"
              id="Load_from_URL"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Load from URL</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Upload_to_Imgur"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Upload to Imgur</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            <tr
              className="menu-row"
              id="Manage_storage"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Manage storage</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Recent_files"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td
                className="menu-item-label"
                style={{ textShadow: "1px 1px 0px rgb(255,255,255)" }}
              >
                Recent Files
              </td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            <tr
              className="menu-row"
              id="Exit"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Exit</td>
              <td className="menu-item-shortcut">Ctrl+Q</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default FileMenu;
