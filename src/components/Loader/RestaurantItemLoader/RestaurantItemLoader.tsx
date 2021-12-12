import React from "react";
import ContentLoader from "react-content-loader";

const RestaurantItemLoader: React.FC = (props) => (
  <ContentLoader
    rtl
    speed={1}
    width={220}
    height={130}
    viewBox="0 0 220 130"
    backgroundColor="#3a3a3a"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="1" y="14" rx="6" ry="6" width="156" height="47" />
    <rect x="11" y="75" rx="2" ry="2" width="41" height="9" />
    <rect x="113" y="75" rx="2" ry="2" width="36" height="9" />
    <rect x="11" y="34" rx="0" ry="0" width="35" height="35" />
    <rect x="11" y="94" rx="2" ry="2" width="90" height="9" />
    <rect x="11" y="108" rx="2" ry="2" width="70" height="9" />
  </ContentLoader>
);

export default RestaurantItemLoader;
