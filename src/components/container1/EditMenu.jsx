import React from "react";
import { EDIT_COMMANDS } from "../../commands/edit.js";

const disabledStyle = {
  color: "#808080",
  textShadow: "1px 1px 0px rgb(255,255,255)",
  pointerEvents: "none",
};

class EditMenu extends React.Component {
  Editfootnote = {
    Undo: "Undos last action",
    Repeat: "Repeats last undo action",
    History: "Shows the full edit history",
    Cut: "Cuts the selection and puts it on clipboard",
    Copy: "Copies the selection to clipboard",
    Paste: "Inserts the content of the clipboard",
    Clear_Selection: "Deletes the selection",
    Select_All: "Selects everything",
    Copy_To: "Copies the selection to a file",
    Paste_from: "Pastes a file into the selection",
  };

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    this.props.setFooter(this.Editfootnote[id] || "");
  };

  handleLeave = () => {
    this.props.clearFooter();
  };

  handleClick = (e) => {
    const id = e.currentTarget.id;
    const cmd = EDIT_COMMANDS[id];
    if (!cmd) return;
    this.props.dispatchCommand(cmd);
  };

  MenuRow = ({ id, label, shortcut = "", disabled }) => (
    <tr
      className="menu-row"
      id={id}
      onMouseEnter={!disabled ? this.handleEnter : undefined}
      onMouseLeave={!disabled ? this.handleLeave : undefined}
      onClick={!disabled ? this.handleClick : undefined}
      style={disabled ? disabledStyle : {}}
    >
      <td className="tickspace"></td>
      <td className="menu-item-label">{label}</td>
      <td className="menu-item-shortcut">{shortcut}</td>
      <td className="secondary-dialog-arrow"></td>
    </tr>
  );
  render() {
    const { canEditSelection } = this.props;
    const Row = this.MenuRow;

    return (
      <div className="dropdown" id="edit_toggle">
        <table className="edit-toggle-content" style={{ fontSize: "11px" }}>
          <tbody>
            <Row id="Undo" label="Undo" shortcut="Ctrl+Z" />
            <Row id="Repeat" label="Repeat" shortcut="F4" />
            <Row id="History" label="History" shortcut="Ctrl+Shift+Y" />
            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>
            <Row id="Cut" label="Cut" disabled={!canEditSelection} />
            <Row id="Copy" label="Copy" disabled={!canEditSelection} />
            <Row id="Paste" label="Paste" disabled={!canEditSelection} />
            <Row
              id="Clear_Selection"
              label="Clear Selection"
              shortcut="Del"
              disabled={!canEditSelection}
            />
            <Row id="Select_All" label="Select All" shortcut="Ctrl+A" />
            <tr className="div-line">
              <td colSpan="4">
                <hr className="menuhr" />
              </td>
            </tr>
            <Row id="Copy_To" label="Copy To" disabled={!canEditSelection} />
            <Row
              id="Paste_from"
              label="Paste From"
              disabled={!canEditSelection}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default EditMenu;
