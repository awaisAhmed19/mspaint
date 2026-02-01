import React from "react";
import FlipRotateDialog from "./FlipRotate";
import StretchSkewDialog from "./StretchSkew";
import AttributesDialog from "./Attributes";
import EditColorsDialog from "./EditColors";
import SaveColorsDialog from "./SaveColor";
import ManageStorageDialog from "./ManageStorage";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

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

    case "EDIT_COLORS":
      return (
        <EditColorsDialog
          dispatchCommand={dispatchCommand}
          onClose={() => dispatchCommand("UI_CLOSE_DIALOG")}
        />
      );
    case "SAVE_COLORS":
      return (
        <SaveColorsDialog
          dispatchCommand={dispatchCommand}
          onClose={() => dispatchCommand("UI_CLOSE_DIALOG")}
        />
      );

    case "FILE_MANAGE_STORAGE":
      return (
        <ManageStorageDialog
          items={ui.savedImages}
          onRemove={(id) => dispatchCommand("UI_CONFIRM_DELETE", { id })}
          onClose={() => dispatchCommand("UI_CLOSE_DIALOG")}
          hasPrev={ui.storagePage > 0}
          hasNext={ui.savedImages.length === ui.storageLimit}
          onPrevPage={() =>
            dispatchCommand("IMAGE_LIST_REMOTE", {
              page: ui.storagePage - 1,
            })
          }
          onNextPage={() =>
            dispatchCommand("IMAGE_LIST_REMOTE", {
              page: ui.storagePage + 1,
            })
          }
        />
      );
    case "CONFIRM_DELETE":
      return (
        <ConfirmDeleteDialog
          onConfirm={() => dispatchCommand("UI_CONFIRM_DELETE_ACCEPT")}
          onCancel={() => dispatchCommand("UI_CLOSE_DIALOG")}
        />
      );
    default:
      return null;
  }
}

export default ModalHost;
