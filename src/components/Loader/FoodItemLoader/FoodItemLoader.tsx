import React from "react";
import ContentLoader from "react-content-loader";

const FoodItemLoader: React.FC = (props) => (
  <ContentLoader
    rtl
    speed={1}
    width={300}
    height={160}
    viewBox="0 0 300 160"
    backgroundColor="#3a3a3a"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="127" y="15" rx="6" ry="6" width="73" height="42" />
    <rect x="1" y="21" rx="2" ry="2" width="69" height="8" />
    <rect x="1" y="35" rx="2" ry="2" width="84" height="21" />
    <rect x="1" y="86" rx="2" ry="2" width="55" height="9" />
    <rect x="151" y="82" rx="2" ry="2" width="48" height="14" />
  </ContentLoader>
);

export default FoodItemLoader;
