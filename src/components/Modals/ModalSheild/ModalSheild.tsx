import React, { useState, useEffect } from "react";
import { Animated } from "react-animated-css";
import type { AnimationString } from "react-animated-css";

import ReactDOM from "react-dom";
import { ModalContainer } from "./Elements";

type Props = {
  onClose: Function;
  animationIn?: AnimationString;
  animationOut?: AnimationString;
  animationInDuration?: number;
  animationOutDuration?: number;
  modal?: JSX.Element;
};

const defaultProps = {
  onClose: () => ({}),
  animationIn: "slideInRight",
  animationOut: "slideOutRight",
  animationInDuration: 1000,
  animationOutDuration: 1000,
  modal: <div>salam</div>,
} as Props;

const ModalSheild: React.FC<Props> = ({
  onClose,
  animationIn = "slideInRight",
  animationOut = "slideOutRight",
  animationInDuration = 1000,
  animationOutDuration = 1000,
  modal = <div>salam</div>,
}) => {
  const [mounted, setMonted] = useState<boolean>(false);

  function onOpen() {
    window.history.pushState({ modalState: "open" }, "?modal"); // not passing a title or URL
  }

  useEffect(() => {
    setMonted(true);
    onOpen();
    window.onpopstate = function (event) {
      setMonted(false);
      setTimeout(() => onClose(), animationOutDuration);
    };
    return () => {
      window.onpopstate = null;
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <Animated
        animationIn={animationIn}
        animationOut={animationOut}
        animationInDuration={animationInDuration}
        animationOutDuration={animationOutDuration}
        isVisible={mounted}
      >
        <ModalContainer>{modal}</ModalContainer>
      </Animated>
    </>,
    document.getElementById("rejayne_modal") as HTMLElement
  );
};

ModalSheild.defaultProps = defaultProps;

export default ModalSheild;
