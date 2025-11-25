import React from "react";

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
    } else {
      console.warn("No footnote found for:", id);
    }
  };

  handleLeave = () => {
    this.props.clearFooter();
  };
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
            <tr
              className="menu-row"
              id="Tool_Box"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Tool Box</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="View_Box"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Color-Box</td>
              <td className="menu-item-shortcut">Ctrl+L</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Status_Bar"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Status Bar</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Text_Toolbar"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
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

            <tr
              className="menu-row"
              id="Zoom"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Zoom</td>
              <td className="menu-item-shortcut"></td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="View_Bitmap"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">View Bitmap</td>
              <td className="menu-item-shortcut">Ctrl+F</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="FullScreen"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
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
