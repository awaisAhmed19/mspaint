import React from "react";

class EditMenu extends React.Component {
  constructor(props) {
    super(props);
    this.Editfootnote = {
      Undo: "Undos last action",
      Repeat: "Repeats last undo action",
      History:
        "Shows you the history which you cannot access with undo and redo ",
      Cut: "Cuts the selection and puts on clipboard",
      Copy: "Copy the selection and puts on clipboard",
      Paste: "Inserts the content of the clipboard",
      Clear_Selection: "Deletes the selections",
      Select_All: "Selects everything",
      Copy_To: "Copies the selection to a file",
      Paste_from: "Pastes a file into the selection",
    };
  }
  handleEnter = (e) => {
    const id = e.currentTarget.id;

    if (this.Editfootnote[id]) {
      this.props.setFooter(this.Editfootnote[id]);
    } else {
      console.warn("No footnote found for:", id);
    }
  };

  handleLeave = () => {
    this.props.clearFooter();
  };

  render() {
    return (
      <div className="dropdown" id="edit_toggle">
        <table
          className="edit-toggle-content"
          style={{
            width: "192px",
            height: "195px",
            fontSize: "11px",
          }}
        >
          <tbody>
            <tr
              className="menu-row"
              id="Undo"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Undo</td>
              <td className="menu-item-shortcut">Ctrl+Z</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Repeat"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Repeat</td>
              <td className="menu-item-shortcut">F4</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="History"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">History</td>
              <td className="menu-item-shortcut">Ctrl+Shift+Y</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            <tr
              className="menu-row"
              id="Cut"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Cut</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Copy"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Copy</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Paste"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Paste</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Clear_Selection"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Clear Selection</td>
              <td className="menu-item-shortcut">Del</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Select_All"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Select All</td>
              <td className="menu-item-shortcut">Ctrl+A</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            <tr
              className="menu-row"
              id="Copy_To"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Copy to</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Paste_from"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Paste-from</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default EditMenu;
