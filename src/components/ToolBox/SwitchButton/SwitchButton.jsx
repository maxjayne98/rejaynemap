import React from "react";
import "./SwitchButton.css";

function SwitchButton() {
  return (
    // <div
    //   style={{
    //     width: "70px",
    //     height: "70px",
    //     backgroundColor: "red",
    //     zIndex: "1000",
    //     top: "0",
    //     left: "0",
    //     position: "absolute",
    //   }}
    // >
    //    <div className="power-switch">
    //     <input type="checkbox" />
    //     <div className="button">
    //       <svg className="power-off">
    //         <use xlinkHref="#line" className="line" />
    //         <use xlinkHref="#circle" className="circle" />
    //       </svg>
    //       <svg className="power-on">
    //         <use xlinkHref="#line" className="line" />
    //         <use xlinkHref="#circle" className="circle" />
    //       </svg>
    //     </div>
    //   </div>
    //   <svg xmlnsXlink="http://www.w3.org/2000/svg" style={{ display: "none" }}>
    //     <symbol
    //       xmlnsXlink="http://www.w3.org/2000/svg"
    //       viewBox="0 0 150 150"
    //       id="line"
    //     >
    //       <line x1="75" y1="34" x2="75" y2="58" />
    //     </symbol>
    //     <symbol
    //       xmlnsXlink="http://www.w3.org/2000/svg"
    //       viewBox="0 0 150 150"
    //       id="circle"
    //     >
    //       <circle cx="75" cy="80" r="35" />
    //     </symbol>
    //   </svg>
    // </div>
    <>
      <input type="checkbox" id="toggle" />
      <label for="toggle" className="toggleWrapper">
        <div className="toggle"></div>
      </label>
    </>
  );
}

export default SwitchButton;
