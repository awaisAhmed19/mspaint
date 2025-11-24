import React from "react";

class EditMenu extends React.Component {
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
            <tr className="menu-row" id="Undo">
              <td className="tickspace"></td>
              <td className="menu-item-label">Undo</td>
              <td className="menu-item-shortcut">Ctrl+Z</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Repeat">
              <td className="tickspace"></td>
              <td className="menu-item-label">Repeat</td>
              <td className="menu-item-shortcut">F4</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="History">
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

            <tr className="menu-row" id="Cut">
              <td className="tickspace"></td>
              <td className="menu-item-label">Cut</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Copy">
              <td className="tickspace"></td>
              <td className="menu-item-label">Copy</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Paste">
              <td className="tickspace"></td>
              <td className="menu-item-label">Paste</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Clear_Selection">
              <td className="tickspace"></td>
              <td className="menu-item-label">Clear Selection</td>
              <td className="menu-item-shortcut">Del</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Select_All">
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

            <tr className="menu-row" id="Copy_To">
              <td className="tickspace"></td>
              <td className="menu-item-label">Copy to</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Paste_from">
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
