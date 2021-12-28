import React, { useEffect } from "react";
import { Toggle, ToggleWrapper, SimpleInput } from "./SwitchButtonElements";

function SwitchButton({ onClick }) {
  return (
    <>
      <SimpleInput type="checkbox" id="toggle" onClick={onClick} />
      <ToggleWrapper htmlFor="toggle">
        <Toggle />
      </ToggleWrapper>
    </>
  );
}

export default SwitchButton;
