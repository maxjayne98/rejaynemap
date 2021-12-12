import React, { useState, useEffect } from "react";
import { HomeContainer } from "./Elements";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <HomeContainer>
        <span>salam</span>
      </HomeContainer>
    </>
  );
};

export default Home;