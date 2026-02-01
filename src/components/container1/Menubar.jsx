import React from "react";
import DropdownContainer from "./DropdownContainer";
import FileMenu from "./FileMenu";
import EditMenu from "./EditMenu";
import ViewMenu from "./ViewMenu";
import LayerMenu from "./LayerMenu";
import ImageMenu from "./ImageMenu";
import ColorMenu from "./ColorMenu";
// import HelpMenu from "./HelpMenu";

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
    const {
      setFooter,
      clearFooter,
      dispatchCommand,
      isSelectionToolActive, // ✅ single source of truth
    } = this.props;

    const commonProps = {
      setFooter,
      clearFooter,
      dispatchCommand,
      isSelectionToolActive,
    };

    switch (activeMenu) {
      case "file":
        return <FileMenu {...commonProps} />;

      case "edit":
        return <EditMenu {...commonProps} />;

      case "view":
        return <ViewMenu {...commonProps} />;

      // case "layer":
      //   return <LayerMenu {...commonProps} />;

      case "image":
        return <ImageMenu {...commonProps} />;

      case "colors":
        return <ColorMenu {...commonProps} />;

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
            {/* <button onClick={() => this.setActiveMenu("layer")}>Layer</button> */}
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
