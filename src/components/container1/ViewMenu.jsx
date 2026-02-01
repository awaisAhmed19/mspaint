import React from "react";
import { VIEW_COMMANDS } from "../../commands/view.js";

class ViewMenu extends React.Component {
  constructor(props) {
    super(props);

    this.Viewfootnote = {
      Tool_Box: "shows or hides the tool bar",
      View_Box: "shows or hides the color bar",
      Status_Bar: "shows or hides the status bar",
      Text_Toolbar: "shows or hides the text toolbar",
      Zoom: "zooming with options.",
      View_Bitmap: "Displays the entire picture",
      FullScreen: "Makes the application full screen",
    };
  }

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    if (this.Viewfootnote[id]) {
      this.props.setFooter(this.Viewfootnote[id]);
    }
  };

  handleLeave = () => {
    this.props.clearFooter();
  };

  handleClick = (e) => {
    const id = e.currentTarget.id;
    const cmd = VIEW_COMMANDS[id];
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
      <div className="dropdown" id="view_toggle">
        <table
          className="view-toggle-content"
          style={{ width: "192px", height: "150px", fontSize: "11px" }}
        >
          <tbody>
            <Row id="Tool_Box" label="Tool Box" />
            <Row id="View_Box" label="Color-Box" shortcut="Ctrl+L" />
            <Row id="Status_Bar" label="Status Bar" />
            <Row id="Text_Toolbar" label="Text Toolbar" />

            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>

            <Row id="Zoom" label="Zoom" />
            <Row id="View_Bitmap" label="View Bitmap" shortcut="Ctrl+F" />
            <Row id="FullScreen" label="Full Screen" shortcut="F11" />
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewMenu;
