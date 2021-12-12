import React from "react";
import ContentLoader from "react-content-loader";

const FoodPartyItemLoader: React.FC = () => (
  <ContentLoader
    speed={1}
    width={200}
    height={110}
    viewBox="0 0 200 110"
    backgroundColor="#3a3a3a"
    foregroundColor="#ecebeb"
    rtl
    // {...props}
  >
    <rect x="2" y="19" rx="6" ry="6" width="87" height="55" />
    <rect x="100" y="37" rx="0" ry="0" width="39" height="6" />
    <rect x="100" y="20" rx="0" ry="0" width="69" height="8" />
    <rect x="99" y="52" rx="6" ry="6" width="35" height="22" />
    <rect x="143" y="54" rx="0" ry="0" width="39" height="6" />
    <rect x="143" y="64" rx="0" ry="0" width="39" height="6" />
    <rect x="2" y="82" rx="0" ry="0" width="182" height="3" />
    <rect x="2" y="88" rx="2" ry="2" width="61" height="14" />
    <rect x="107" y="92" rx="0" ry="0" width="39" height="6" />
    <rect x="166" y="89" rx="1" ry="1" width="14" height="14" />
  </ContentLoader>
);

export default FoodPartyItemLoader;
