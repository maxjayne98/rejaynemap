import Lottie from "lottie-react";
import ErrorLottie from "../../../assets/lottie/connection-error.json";
interface Props {}

export const ConnectionError: React.FC = (props: Props) => {
  return (
    <div>
      <Lottie animationData={ErrorLottie} />
    </div>
  );
};
