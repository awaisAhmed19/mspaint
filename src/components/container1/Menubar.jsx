import React from "react";
import DropdownContainer from "./DropdownContainer";
import FileMenu from "./FileMenu";
import EditMenu from "./EditMenu";
import ViewMenu from "./ViewMenu";
import LayerMenu from "./LayerMenu";
import ImageMenu from "./ImageMenu";
import ColorMenu from "./ColorMenu";
//import HelpMenu from "./HelpMenu";

class Menubar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMenu: null,
    };

    this.menuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (this.menuRef.current && !this.menuRef.current.contains(e.target)) {
      this.setState({ activeMenu: null });
    }
  };

  setActiveMenu = (menu) => {
    this.setState((prev) => ({
      activeMenu: prev.activeMenu === menu ? null : menu,
    }));
  };

  renderMenu = () => {
    const { activeMenu } = this.state;

    switch (activeMenu) {
      case "file":
        return (
          <FileMenu
            setFooter={this.props.setFooter}
            clearFooter={this.props.clearFooter}
          />
        );
      case "edit":
        return (
          <EditMenu
            setFooter={this.props.setFooter}
            clearFooter={this.props.clearFooter}
          />
        );
      case "view":
        return (
          <ViewMenu
            setFooter={this.props.setFooter}
            clearFooter={this.props.clearFooter}
          />
        );
      case "layer":
        return (
          <LayerMenu
            setFooter={this.props.setFooter}
            clearFooter={this.props.clearFooter}
          />
        );
      case "image":
        return (
          <ImageMenu
            setFooter={this.props.setFooter}
            clearFooter={this.props.clearFooter}
          />
        );
      case "colors":
        return (
          <ColorMenu
            setFooter={this.props.setFooter}
            clearFooter={this.props.clearFooter}
          />
        );
      //case "help":
      // return <HelpMenu />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="container-1">
        <div ref={this.menuRef}>
          <div className="menubar">
            <button onClick={() => this.setActiveMenu("file")}>File</button>
            <button onClick={() => this.setActiveMenu("edit")}>Edit</button>
            <button onClick={() => this.setActiveMenu("view")}>View</button>
            <button onClick={() => this.setActiveMenu("layer")}>Layer</button>
            <button onClick={() => this.setActiveMenu("image")}>Image</button>
            <button onClick={() => this.setActiveMenu("colors")}>Color</button>
            <button onClick={() => this.setActiveMenu("help")}>Help</button>
          </div>

          <DropdownContainer>{this.renderMenu()}</DropdownContainer>
        </div>
      </div>
    );
  }
}

export default Menubar;
