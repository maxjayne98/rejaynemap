import Lottie from "lottie-react";
import ErrorLottie from "../../../assets/lottie/error.json";
interface Props {}

export const Error: React.FC = (props: Props) => {
  return (
    <div>
      <Lottie animationData={ErrorLottie} />
      <div style={{ color: "red" }}>متاسفانه مشکلی رخ داده است !</div>
    </div>
  );
};
