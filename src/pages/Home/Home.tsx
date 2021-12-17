import React, { useState, useEffect, useRef, useReducer } from "react";
import { HomeContainer } from "./Elements";
import CustomMap from "components/Map/CustomMap";

const Home: React.FC = () => {
  return (
    <>
      <HomeContainer>
        <CustomMap />
      </HomeContainer>
    </>
  );
};

export default Home;
