import React from "react";

class ColorMenu extends React.Component {
  render() {
    return (
      <div className="dropdown" id="colors_toggle" style={{ left: "180px" }}>
        <table
          className="colors-toggle-content"
          style={{
            width: "128px",
            height: "56px",
            fontSize: "11px",
          }}
        >
          <tbody>
            <tr className="menu-row" id="Edit_Colors">
              <td className="tickspace"></td>
              <td className="menu-item-label">Edit Colors..</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Get_Colors">
              <td className="tickspace"></td>
              <td className="menu-item-label">Get Colors</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Save_Colors">
              <td className="tickspace"></td>
              <td className="menu-item-label">Save Color</td>
              <td
                className="secondary-dialog-arrow"
                style={{ alignItems: "center" }}
              >
                Ctrl+I
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ColorMenu;
