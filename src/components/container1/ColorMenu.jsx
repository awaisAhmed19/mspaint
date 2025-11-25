import React from "react";

class ColorMenu extends React.Component {
  constructor(props) {
    super(props);
    this.Colorfootnote = {
      Edit_Colors: "Creates a new color",
      Get_Colors: "Uses a previously saved pallete of colors",
      Save_Colors: "saves the current pallete of colors to a file",
    };
  }

  handleEnter = (e) => {
    const id = e.currentTarget.id;

    if (this.Colorfootnote[id]) {
      this.props.setFooter(this.Colorfootnote[id]);
    } else {
      console.warn("No footnote found for:", id);
    }
  };

  handleLeave = () => {
    this.props.clearFooter();
  };
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
            <tr
              className="menu-row"
              id="Edit_Colors"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Edit Colors..</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Get_Colors"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
              <td className="tickspace"></td>
              <td className="menu-item-label">Get Colors</td>
              <td className="secondary-dialog-arrow"></td>
            </tr>

            <tr
              className="menu-row"
              id="Save_Colors"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            >
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
