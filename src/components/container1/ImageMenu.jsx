import React from "react";
import { IMAGE_COMMANDS } from "../../commands/image.js";

class ImageMenu extends React.Component {
  Imagefootnote = {
    Flip_Rotate: "Flips or Rotates a picture or a selection",
    Stretch_Skew: "Stretch or skews a picture or a selection",
    Invert_Color: "Inverts the color a picture or a selection",
    Attributes: "Changes the attributes of a picture",
    Clear_Image: "Clears the canvas",
    Draw_Opaque: "Makes the current selection either opaque or transparent",
  };

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    this.props.setFooter(this.Imagefootnote[id] || "");
  };

  handleLeave = () => {
    this.props.clearFooter();
  };

  handleClick = (e) => {
    const id = e.currentTarget.id;
    const cmd = IMAGE_COMMANDS[id];
    if (!cmd) return;
    this.props.dispatchCommand(cmd);
  };

  MenuRow = ({ id, label, shortcut = "" }) => (
    <tr
      className="menu-row"
      id={id}
      onMouseEnter={this.handleEnter}
      onMouseLeave={this.handleLeave}
      onClick={this.handleClick}
    >
      <td className="tickspace"></td>
      <td className="menu-item-label">{label}</td>
      <td className="menu-item-shortcut">{shortcut}</td>
      <td className="secondary-dialog-arrow"></td>
    </tr>
  );

  render() {
    const Row = this.MenuRow;

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
            <Row id="Flip_Rotate" label="Flip/Rotate" shortcut="Ctrl+Alt+R" />
            <Row id="Stretch_Skew" label="Stretch/Skew" shortcut="Ctrl+Alt+W" />
            <Row id="Invert_Color" label="Invert Color" shortcut="Ctrl+I" />
            <Row id="Attributes" label="Attributes.." shortcut="Ctrl+E" />
            <Row id="Clear_Image" label="Clear Image" />
            <Row id="Draw_Opaque" label="Draw Opaque" />
          </tbody>
        </table>
      </div>
    );
  }
}

export default ImageMenu;
