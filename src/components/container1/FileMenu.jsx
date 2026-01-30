import React from "react";
import Footer from "../container4/Footer";

import { FILE_COMMANDS } from "../../commands/file.js";

function FileMenu(props) {
  const Filefootnote = {
    New_file: "Creates a new document.",
    Open_file: "Opens a existing document",
    Save_file: "Saves the active document",
    Saveas_file: "Saves the active document with a new name",
    Load_from_URL: "Opens an image from Web",
    Upload_to_Imgur: "Uploads the active document on imgur",
    Manage_storage: "Manage storage of previously created or open document",
    Set_as_WallpaperT: "Tiles this bitmap on the desktop backgorund",
    Set_as_WallpaperC: "Center this bitmap on the desktop backgorund",
    Recent_files: "List recent files",
    Exit: "Quits Paint.",
  };

  const handleEnter = (e) => {
    const id = e.currentTarget.id;

    if (Filefootnote[id]) {
      props.setFooter(Filefootnote[id]);
    } else {
      console.warn("No footnote found for:", id);
    }
  };

  const handleLeave = () => {
    props.clearFooter();
  };

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    const cmd = FILE_COMMANDS[id];
    if (!cmd) return;
    props.dispatchCommand(cmd);
  };

  const MenuRow = ({ id, label, shortcut = "", style = {} }) => (
    <tr
      className="menu-row"
      id={id}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick} // ✅ ADD THIS
    >
      <td className="tickspace"></td>
      <td className="menu-item-label" style={style}>
        {label}
      </td>
      <td className="menu-item-shortcut">{shortcut}</td>
      <td className="secondary-dialog-arrow"></td>
    </tr>
  );

  return (
    <div
      className="dropdown"
      id="file_toggle"
      style={{ width: "275px", height: "310px", left: "0" }}
    >
      <table
        className="toggle-content"
        style={{ width: "275px", height: "305px", left: "0" }}
      >
        <tbody>
          <MenuRow id="New_file" label="New" shortcut="Ctrl+Alt+N" />
          <MenuRow id="Open_file" label="Open" shortcut="Ctrl+Alt+O" />
          <MenuRow id="Save_file" label="Save" />
          <MenuRow id="Saveas_file" label="SaveAs" shortcut="Ctrl+S" />

          <tr className="div-line">
            <td colSpan="4">
              <hr className="menuhr" />
            </td>
          </tr>

          <MenuRow id="Load_from_URL" label="Load from URL" />
          <MenuRow id="Upload_to_Imgur" label="Upload to Imgur" />

          <tr className="div-line">
            <td colSpan="4">
              <hr className="menuhr" />
            </td>
          </tr>

          <MenuRow id="Manage_storage" label="Manage storage" />
          <MenuRow
            id="Recent_files"
            label="Recent Files"
            style={{ textShadow: "1px 1px 0px rgb(255,255,255)" }}
          />

          <tr className="div-line">
            <td colSpan="4">
              <hr className="menuhr" />
            </td>
          </tr>

          <MenuRow id="Exit" label="Exit" shortcut="Ctrl+Q" />
        </tbody>
      </table>
    </div>
  );
}

export default FileMenu;
