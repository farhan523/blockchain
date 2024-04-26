import React, {useState} from 'react';

import styled from 'styled-components';



import AllCryptoMarketCapChart from './components/AllCryptoMarketCapChart';
import FearAndGreedChart from './components/FearAndGreedChart';
import TopGainersAndLosers from './components/TopGainersAndLosers';
import VolumeChart from './components/VolumeChart';
import DefiChart from './components/DefiChart';

export const MarketCap = () => {
  return (
    <>
        
      <StyledHeading>Crypto Market Overview</StyledHeading>
      <StyledMainBox>
        <TopGainersAndLosers />
        <AllCryptoMarketCapChart />
        <VolumeChart />
        <FearAndGreedChart />
        <DefiChart />
      </StyledMainBox>
    </>
  );
};

const StyledHeading = styled.h2`
  font-family: 'Montserrat';
  font-size: 42px;
  line-height: 51px;
  font-weight: 500;
  margin-left: 5%;
  margin-bottom:20px;
  margin-top:20px;
  color: #112455;
  @media (max-width: 900px) {
    font-size: 32px;
    font-weight: 400;
  }
`;

const StyledMainBox = styled.div`
  display: flex;
  width: calc(100%);
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
`;