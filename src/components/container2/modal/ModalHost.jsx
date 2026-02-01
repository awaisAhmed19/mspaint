import React from "react";
import FlipRotateDialog from "./FlipRotate";
import StretchSkewDialog from "./StretchSkew";
import AttributesDialog from "./Attributes";

function ModalHost({ ui, dispatchCommand, canvasInfo }) {
  switch (ui.activeDialog) {
    case "FLIP_ROTATE":
      return (
        <FlipRotateDialog
          dispatchCommand={dispatchCommand}
          onClose={() => dispatchCommand("UI_CLOSE_DIALOG")}
        />
      );

    case "STRETCH_SKEW":
      return (
        <StretchSkewDialog
          dispatchCommand={dispatchCommand}
          onClose={() => dispatchCommand("UI_CLOSE_DIALOG")}
        />
      );

    case "ATTRIBUTES":
      return (
        <AttributesDialog
          dispatchCommand={dispatchCommand}
          onClose={() => dispatchCommand("UI_CLOSE_DIALOG")}
          canvasInfo={canvasInfo}
        />
      );

    default:
      return null;
  }
}

export default ModalHost;
