import React from "react";

class ImageMenu extends React.Component {
  constructor(props) {
    super(props);
    this.Imagefootnote = {
      Flip_Rotate: "Flips or Rotates a picture or a selection",
      Stretch_Skew: "Stretch or skews a picture or a selection",
      Invert_Color: "Inverts the color a picture or a selection",
      Attributes: "Changes the attributes of a picture",
      Clear_Image: "Clears the canvas",
      Draw_Opaque: "Makes the current selection either opaque or transparent",
    };
  }
  handleEnter = (e) => {
    const id = e.currentTarget.id;

    if (this.Imagefootnote[id]) {
      this.props.setFooter(this.Imagefootnote[id]);
    } else {
      console.warn("No footnote found for:", id);
    }
  };

  handleLeave = () => {
    this.props.clearFooter();
  };
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
            <tr
              className="menu-row"
              id="Flip_Rotate"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Flip/Rotate</td>
              <td className="menu-item-shortcut">Ctrl+Alt+R</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Stretch_Skew"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Stretch/Skew</td>
              <td className="menu-item-shortcut">Ctrl+Alt+W</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Invert_Color"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Invert Color</td>
              <td className="menu-item-shortcut">Ctrl+I</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Attributes"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Attributes..</td>
              <td className="menu-item-shortcut">Ctrl+E</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Clear_Image"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Clear Image</td>
              <td className="menu-item-options"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Draw_Opaque"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
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
