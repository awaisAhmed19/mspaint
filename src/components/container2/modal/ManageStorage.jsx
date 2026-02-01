import React from "react";

class ManageStorageDialog extends React.Component {
  render() {
    const {
      onClose,
      items = [],
      onRemove,
      onNextPage,
      onPrevPage,
      hasNext,
      hasPrev,
    } = this.props;

    return (
      <div className="window">
        {/* TITLE BAR */}
        <div className="window-titlebar" style={{ touchAction: "none" }}>
          <div className="window-title-area">
            <span className="window-title">Manage Storage</span>
          </div>
          <button
            className="window-close-button window-action-close window-button"
            aria-label="Close window"
            onClick={onClose}
          />
        </div>

        {/* CONTENT */}
        <div
          className="window-content"
          tabIndex={-1}
          style={{ outline: "none" }}
        >
          <table>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <a
                      href={item.openUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="thumbnail-container"
                    >
                      <img
                        src={item.thumbnailUrl}
                        className="thumbnail-img"
                        alt={item.name}
                      />
                    </a>
                  </td>

                  <td>
                    <a href={item.openUrl} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => onRemove && onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: "8px" }}>
                    No saved images.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <p style={{ marginTop: 8 }}>
            Any images you've saved to your computer with <b>File &gt; Save</b>{" "}
            will not be affected.
          </p>

          {/* BUTTONS */}
          <div className="button-group">
            <button type="button" disabled={!hasPrev} onClick={onPrevPage}>
              Prev
            </button>

            <button type="button" disabled={!hasNext} onClick={onNextPage}>
              Next
            </button>

            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageStorageDialog;
