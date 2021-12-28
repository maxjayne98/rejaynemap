import React from "react";
import { Icon, IconButton } from "./Elements";

const RotatingIconButton: React.FC = ({ children }) => {
  const icons = React.Children.toArray(children);

  const [current, setCurrent] = React.useState(0);

  function cycleState() {
    setCurrent(current === icons.length - 1 ? 0 : current + 1);
  }

  const isInitial = React.useRef(true);

  React.useEffect(() => {
    isInitial.current = false;
  }, []);

  return (
    <IconButton onClick={cycleState}>
      {icons.map((icon, i) => {
        const isCurrent = i === current;
        return (
          <Icon key={i} isInitial={isInitial.current} isCurrent={isCurrent}>
            {icon}
          </Icon>
        );
      })}
    </IconButton>
  );
};

export default RotatingIconButton;
