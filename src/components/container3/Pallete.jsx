import React from "react";

class Pallete extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="pallete-preview">
          <div
            className="selectedcolor"
            id="selected-color"
            data-color="[0, 0, 0, 255]"
            style={{ backgroundColor: "rgb(0, 0, 0)" }}
          ></div>

          <div
            className="switchcolor"
            id="switch-color"
            data-color="[255, 255, 255, 255]"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          ></div>
        </div>

        <div className="pallete-layout">
          <button
            className="pallete-color"
            id="black-button"
            data-color="[0, 0, 0, 255]"
            style={{ backgroundColor: "rgb(0, 0, 0)" }}
          ></button>

          <button
            className="pallete-color"
            id="grey-button"
            data-color="[128, 128, 128, 255]"
            style={{ backgroundColor: "rgb(128, 128, 128)" }}
          ></button>

          <button
            className="pallete-color"
            id="maroon-button"
            data-color="[128, 0, 0, 255]"
            style={{ backgroundColor: "rgb(128, 0, 0)" }}
          ></button>

          <button
            className="pallete-color"
            id="dirty-yellow-button"
            data-color="[185, 155, 20, 255]"
            style={{ backgroundColor: "rgb(185, 155, 20)" }}
          ></button>

          <button
            className="pallete-color"
            id="green-button"
            data-color="[0, 128, 0, 255]"
            style={{ backgroundColor: "rgb(0, 128, 0)" }}
          ></button>

          <button
            className="pallete-color"
            id="teal-button"
            data-color="[0, 128, 128, 255]"
            style={{ backgroundColor: "rgb(0, 128, 128)" }}
          ></button>

          <button
            className="pallete-color"
            id="navyblue-button"
            data-color="[0, 0, 128, 255]"
            style={{ backgroundColor: "rgb(0, 0, 128)" }}
          ></button>

          <button
            className="pallete-color"
            id="purple-button"
            data-color="[128, 0, 128, 255]"
            style={{ backgroundColor: "rgb(128, 0, 128)" }}
          ></button>

          <button
            className="pallete-color"
            id="dirty-yellowish-button"
            data-color="[199, 151, 61, 255]"
            style={{ backgroundColor: "rgb(199, 151, 61)" }}
          ></button>

          <button
            className="pallete-color"
            id="greenish-blue-button"
            data-color="[0, 63, 63, 255]"
            style={{ backgroundColor: "rgb(0, 63, 63)" }}
          ></button>

          <button
            className="pallete-color"
            id="lightseagreen-button"
            data-color="[32, 178, 170, 255]"
            style={{ backgroundColor: "rgb(32, 178, 170)" }}
          ></button>

          <button
            className="pallete-color"
            id="royal-blue-button"
            data-color="[0, 65, 129, 255]"
            style={{ backgroundColor: "rgb(0, 65, 129)" }}
          ></button>

          <button
            className="pallete-color"
            id="deep-blue-button"
            data-color="[64, 0, 255, 255]"
            style={{ backgroundColor: "rgb(64, 0, 255)" }}
          ></button>

          <button
            className="pallete-color"
            id="brown-button"
            data-color="[128, 65, 1, 255]"
            style={{ backgroundColor: "rgb(128, 65, 1)" }}
          ></button>

          <button
            className="pallete-color"
            id="white-button"
            data-color="[255, 255, 255, 255]"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          ></button>

          <button
            className="pallete-color"
            id="lightgray-button"
            data-color="[211, 211, 211, 255]"
            style={{ backgroundColor: "rgb(211, 211, 211)" }}
          ></button>

          <button
            className="pallete-color"
            id="red-button"
            data-color="[255, 0, 0, 255]"
            style={{ backgroundColor: "rgb(255, 0, 0)" }}
          ></button>

          <button
            className="pallete-color"
            id="yellow-button"
            data-color="[255, 255, 0, 255]"
            style={{ backgroundColor: "rgb(255, 255, 0)" }}
          ></button>

          <button
            className="pallete-color"
            id="lightgreen-button"
            data-color="[144, 238, 144, 255]"
            style={{ backgroundColor: "rgb(144, 238, 144)" }}
          ></button>

          <button
            className="pallete-color"
            id="lightblue-button"
            data-color="[173, 216, 230, 255]"
            style={{ backgroundColor: "rgb(173, 216, 230)" }}
          ></button>

          <button
            className="pallete-color"
            id="blue-button"
            data-color="[0, 0, 255, 255]"
            style={{ backgroundColor: "rgb(0, 0, 255)" }}
          ></button>

          <button
            className="pallete-color"
            id="pink-button"
            data-color="[255, 192, 203, 255]"
            style={{ backgroundColor: "rgb(255, 192, 203)" }}
          ></button>

          <button
            className="pallete-color"
            id="beige-button"
            data-color="[245, 245, 220, 255]"
            style={{ backgroundColor: "rgb(245, 245, 220)" }}
          ></button>

          <button
            className="pallete-color"
            id="sea-green-button"
            data-color="[1, 255, 129, 255]"
            style={{ backgroundColor: "rgb(1, 255, 129)" }}
          ></button>

          <button
            className="pallete-color"
            id="cyan-button"
            data-color="[0, 255, 255, 255]"
            style={{ backgroundColor: "rgb(0, 255, 255)" }}
          ></button>

          <button
            className="pallete-color"
            id="dull-blue-button"
            data-color="[128, 128, 255, 255]"
            style={{ backgroundColor: "rgb(128, 128, 255)" }}
          ></button>

          <button
            className="pallete-color"
            id="darkpink-button"
            data-color="[255, 0, 128, 255]"
            style={{ backgroundColor: "rgb(255, 0, 128)" }}
          ></button>

          <button
            className="pallete-color"
            id="mud-orange-button"
            data-color="[255, 129, 65, 255]"
            style={{ backgroundColor: "rgb(255, 129, 65)" }}
          ></button>
        </div>
      </>
    );
  }
}

export default Pallete;
