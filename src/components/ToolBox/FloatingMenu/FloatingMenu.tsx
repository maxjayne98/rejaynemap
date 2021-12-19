import React from "react";
import {
  FloatingMenuWrapper,
  FloatingMenuCheckBox,
  FloatingMenuLabel,
  FloatingMenuContentsContainer,
  FloatingMenuContentItem,
} from "./FloatingMenuElements";

const FloatingMenu: React.FC = ({ children }) => {
  return (
    <>
      <FloatingMenuWrapper>
        <FloatingMenuCheckBox type="checkbox" id="toggle-floating-menu" />
        <FloatingMenuLabel htmlFor="toggle-floating-menu"></FloatingMenuLabel>
        <FloatingMenuContentsContainer>
          {React.Children.map(children as any, (child: React.ReactElement) => (
            <FloatingMenuContentItem>{child}</FloatingMenuContentItem>
          ))}
        </FloatingMenuContentsContainer>
      </FloatingMenuWrapper>
    </>
  );
};

export default FloatingMenu;
