import React from "react";

class ViewMenu extends React.Component {
  render() {
    return (
      <div className="dropdown" id="view_toggle">
        <table
          className="view-toggle-content"
          style={{
            width: "192px",
            height: "150px",
            fontSize: "11px",
          }}
        >
          <tbody>
            <tr className="menu-row" id="Tool_Box">
              <td className="tickspace"></td>
              <td className="menu-item-label">Tool Box</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Color_Box">
              <td className="tickspace"></td>
              <td className="menu-item-label">Color-Box</td>
              <td className="menu-item-shortcut">Ctrl+L</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Status_Bar">
              <td className="tickspace"></td>
              <td className="menu-item-label">Status Bar</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Text_Toolbar">
              <td className="tickspace"></td>
              <td className="menu-item-label">Text Toolbar</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            <tr className="menu-row" id="Zoom">
              <td className="tickspace"></td>
              <td className="menu-item-label">Zoom</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="View_Bitmap">
              <td className="tickspace"></td>
              <td className="menu-item-label">View Bitmap</td>
              <td className="menu-item-shortcut">Ctrl+F</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="FullScreen">
              <td className="tickspace"></td>
              <td className="menu-item-label">Full Screen</td>
              <td className="menu-item-shortcut">F11</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewMenu;
