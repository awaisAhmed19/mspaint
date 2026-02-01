import React from "react";

class AboutPaintDialog extends React.Component {
  render() {
    const { onClose } = this.props;

    return (
      <div className="window" style={{ width: "auto" }}>
        {/* TITLE BAR */}
        <div className="window-titlebar" style={{ touchAction: "none" }}>
          <div className="window-title-area">
            <span className="window-title">About Paint</span>
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
          style={{ outline: "none", padding: 15 }}
        >
          <div id="about-paint">
            {/* HEADER */}
            <div id="about-paint-header" style={{ display: "flex", gap: 12 }}>
              <img
                src="../../../../public/128x128.png"
                width={128}
                height={128}
                id="about-paint-icon"
                alt=""
              />

              <div id="about-paint-beside-icon">
                <h1 id="mspaint-project-name">MS Paint</h1>

                <div
                  id="mspaint-version"
                  title="About time to increment the version number, don't you think?"
                >
                  Version 1.0.0+
                </div>

                <div id="mspaint-update-status-area">
                  {/* intentionally static for now */}
                </div>
              </div>

              {/* <button id="view-project-news">What&apos;s&nbsp;New?</button> */}
            </div>

            {/* BODY */}
            <p>
              MS Paint remake by{" "}
              <a
                href="https://github.com/awaisAhmed19/awaisAhmed19"
                target="_blank"
                rel="noreferrer"
              >
                Awais&nbsp;Ahmed
              </a>
            </p>

            <p>
              Feedback:{" "}
              <a
                href="https://github.com/awaisAhmed19/mspaint/issues"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>{" "}
              or{" "}
              <a href="mailto:awaisahmedoffi@gmail.com?subject=MS%20Paint">
                E-mail
              </a>
            </p>

            <p>
              <a
                href="https://github.com/awaisAhmed19/mspaint/blob/main/LICENSE.txt"
                target="_blank"
                rel="noreferrer"
              >
                MIT License
              </a>
            </p>
          </div>

          {/* FOOTER */}
          <button
            id="close-about-paint"
            style={{ float: "right", marginBottom: 10 }}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default AboutPaintDialog;
