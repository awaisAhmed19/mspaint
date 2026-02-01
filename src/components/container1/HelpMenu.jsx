import React from "react";

class HelpMenu extends React.Component {
  constructor(props) {
    super(props);

    this.HelpFootnote = {
      Help_Topics: "Displays Help topics",
      About_Paint: "Displays information about Paint",
    };
  }

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    if (this.HelpFootnote[id]) {
      this.props.setFooter(this.HelpFootnote[id]);
    }
  };

  handleLeave = () => {
    this.props.clearFooter();
  };

  handleClick = (e) => {
    const id = e.currentTarget.id;

    switch (id) {
      case "Help_Topics":
        this.props.dispatchCommand("HELP_TOPICS");
        break;

      case "About_Paint":
        this.props.dispatchCommand("HELP_ABOUT");
        break;

      default:
        break;
    }
  };

  MenuRow = ({ id, label }) => (
    <tr
      className="menu-row"
      id={id}
      onMouseEnter={this.handleEnter}
      onMouseLeave={this.handleLeave}
      onClick={this.handleClick}
    >
      <td className="tickspace"></td>
      <td className="menu-item-label">{label}</td>
      <td className="menu-item-shortcut"></td>
      <td className="secondary-dialog-arrow"></td>
    </tr>
  );

  render() {
    const Row = this.MenuRow;

    return (
      <div className="dropdown" id="help_toggle">
        <table
          className="help-menu-content"
          style={{ width: "180px", fontSize: "11px" }}
        >
          <tbody>
            {/* <Row id="Help_Topics" label="Help Topics" /> */}
            <Row id="About_Paint" label="About " />
          </tbody>
        </table>
      </div>
    );
  }
}

export default HelpMenu;
