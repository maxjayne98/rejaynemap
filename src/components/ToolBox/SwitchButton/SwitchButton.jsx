import React, { useEffect } from "react";
import "./SwitchButton.css";

function SwitchButton({ onClick }) {
  return (
    <>
      <input type="checkbox" id="toggle" onClick={onClick} />
      <label for="toggle" className="toggleWrapper">
        <div className="toggle"></div>
      </label>
    </>
  );
}

export default SwitchButton;
