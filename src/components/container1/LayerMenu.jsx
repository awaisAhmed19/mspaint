import React from "react";

class LayerMenu extends React.Component {
  render() {
    return (
      <div className="dropdown" id="layer_toggle">
        <table
          className="layers-toggle-content"
          style={{
            width: "192px",
            height: "200px",
            fontSize: "11px",
          }}
        >
          <tbody>
            <tr className="menu-row" id="Properties">
              <td className="tickspace"></td>
              <td className="menu-item-label">Properties..</td>
              <td className="menu-item-shortcut">F2</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Visible">
              <td className="tickspace"></td>
              <td className="menu-item-label">Visible</td>
              <td className="menu-item-shortcut">Shift+X</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Lock_Layers">
              <td className="tickspace"></td>
              <td className="menu-item-label">Lock Layers</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Open_Group">
              <td className="tickspace"></td>
              <td className="menu-item-label">Open Group</td>
              <td className="menu-item-shortcut">Shift+E</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            <tr className="menu-row" id="New_Layer">
              <td className="tickspace"></td>
              <td className="menu-item-label">New</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Delete_Layer">
              <td className="tickspace"></td>
              <td className="menu-item-label">Delete Layer</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Convert_To">
              <td className="tickspace"></td>
              <td className="menu-item-label">Convert To..</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            <tr className="menu-row" id="Duplicate">
              <td className="tickspace"></td>
              <td className="menu-item-label">Duplicate</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Merge_Down">
              <td className="tickspace"></td>
              <td className="menu-item-label">Merge Down</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Flatten">
              <td className="tickspace"></td>
              <td className="menu-item-label">Flatten</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Flatten_Layer">
              <td className="tickspace"></td>
              <td className="menu-item-label">Flatten Layer</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default LayerMenu;
