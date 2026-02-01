import React from "react";

class ConfirmDeleteDialog extends React.Component {
  render() {
    const { onConfirm, onCancel } = this.props;

    return (
      <div className="window">
        <div className="window-titlebar">
          <span className="window-title">Confirm Delete</span>
        </div>

        <div className="window-content">
          <p>Are you sure you want to delete this image?</p>

          <div className="button-group">
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmDeleteDialog;
