import Lottie from "lottie-react";
import LoadingLottie from "../../../assets/lottie/loading2.json";
interface Props {}

const Loading: React.FC = (props: Props) => {
  return (
    <div>
      <Lottie animationData={LoadingLottie} />
    </div>
  );
};

export default Loading;
