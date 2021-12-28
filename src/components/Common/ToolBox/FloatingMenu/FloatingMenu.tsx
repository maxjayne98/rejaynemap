import React, { useState } from "react";
import {
  FloatingMenuWrapper,
  FloatingMenuCheckBox,
  FloatingMenuLabel,
  FloatingMenuContentsContainer,
  FloatingMenuContentItem,
} from "./FloatingMenuElements";

type Props = {
  icon: any;
};

const FloatingMenu: React.FC<Props> = ({ children, icon }) => {
  const [state, setState] = useState(false);
  return (
    <>
      <FloatingMenuWrapper>
        {/* <FloatingMenuCheckBox type="checkbox" id="toggle-floating-menu" /> */}
        <FloatingMenuLabel
          htmlFor="toggle-floating-menu"
          onClick={() => setState((state) => !state)}
        >
          {icon}
        </FloatingMenuLabel>
        <FloatingMenuContentsContainer isOpend={state}>
          {React.Children.map(children as any, (child: React.ReactElement) => (
            <FloatingMenuContentItem>{child}</FloatingMenuContentItem>
          ))}
        </FloatingMenuContentsContainer>
      </FloatingMenuWrapper>
    </>
  );
};

export default FloatingMenu;
