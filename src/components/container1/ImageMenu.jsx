import React from "react";

class ImageMenu extends React.Component {
  render() {
    return (
      <div className="dropdown" id="image_toggle">
        <table
          className="image-toggle-content"
          style={{
            width: "180px",
            height: "110px",
            fontSize: "11px",
          }}
        >
          <tbody>
            <tr className="menu-row" id="Flip_Rotate">
              <td className="tickspace"></td>
              <td className="menu-item-label">Flip/Rotate</td>
              <td className="menu-item-shortcut">Ctrl+Alt+R</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Stretch_Skew">
              <td className="tickspace"></td>
              <td className="menu-item-label">Stretch/Skew</td>
              <td className="menu-item-shortcut">Ctrl+Alt+W</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Invert_Color">
              <td className="tickspace"></td>
              <td className="menu-item-label">Invert Color</td>
              <td className="menu-item-shortcut">Ctrl+I</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Attributes">
              <td className="tickspace"></td>
              <td className="menu-item-label">Attributes..</td>
              <td className="menu-item-shortcut">Ctrl+E</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Clear_Image">
              <td className="tickspace"></td>
              <td className="menu-item-label">Clear Image</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr className="menu-row" id="Draw_Opaque">
              <td className="tickspace"></td>
              <td className="menu-item-label">Draw Opaque</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ImageMenu;
