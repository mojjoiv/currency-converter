import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import HeaderImage from "../../assets/img/header-img.png";
import QuotesIcon from "../../assets/svg/Quotes";
import Dots from "../../assets/svg/Dots";
import CurrencyConverter from '../CurrencyConverter';


 const BASE_URL =
  "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates";

export default function Header() {
  const [currencySymbols, setCurrencySymbols] = useState();
  const [currencySource, setCurrencySource] = useState();
  const [currencyDestination, setCurrencyDestination] = useState();
  const [conversionRate, setConversionRate] = useState();
  const [rateDate, setRateDate] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    async function fetchSymbols() {
      const symbolsURL = `${BASE_URL}/symbols`;
      const symbols = await axios.get(symbolsURL);
      setCurrencySymbols(symbols.data?.symbols || []);
    }
    fetchSymbols();
  }, []);

  function handleDateChange(event) {
    setRateDate(event.target.value);
  }
  function handleSourceChange(event) {
    if (event.target.value?.length > 3) return;
    setCurrencySource(event.target.value?.toUpperCase());
  }
  function handleDestinationChange(event) {
    if (event.target.value?.length > 3) return;
    setCurrencyDestination(event.target.value?.toUpperCase());
  }
  function handleSubmit(event){
    event.preventDefault();
    const rateURL = `${BASE_URL}/historical?date=${rateDate}&base=${currencySource}&symbols=${currencyDestination}`;
    axios.get(rateURL).then(res => {
      setConversionRate(res.data?.rates[currencyDestination]);
    });
  }

  return (
    <Wrapper id="home" className="container flexSpaceCenter">
     <div>
          <h1 className="extraBold font60">Convert Your Currency.</h1>
          <HeaderP className="font13 semiBold">
           
          </HeaderP>
          
        </div>
      <LeftSide className="flexCenter">
       
       
      </LeftSide>
      <br/>
       <CurrencyConverter/>
     
      <RightSide>
        <ImageWrapper>
          {/* <Img className="radius8" src={HeaderImage} alt="office" style={{zIndex: 9}} /> */}
          {/* <QuoteWrapper className="flexCenter darkBg radius8">
            <QuotesWrapper>
              <QuotesIcon />
            </QuotesWrapper>
            <div>
              <p className="font15 whiteColor">
                <h1 className="conversion-result"  >{conversionRate || "0.0"}</h1>
              </p>
              <p className="font13 orangeColor textRight" style={{marginTop: '10px'}}>Ralph Waldo Emerson</p>
            </div>
          </QuoteWrapper> */}
          {/* <DotsWrapper>
            <Dots />
          </DotsWrapper> */}
        </ImageWrapper>
        {/* <GreyDiv className="lightBg"></GreyDiv> */}
      </RightSide>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 700px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;
const QuoteWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 50px;
  max-width: 330px;
  padding: 30px;
  z-index: 99;
  @media (max-width: 960px) {
    left: 20px;
  }
  @media (max-width: 560px) {
    bottom: -50px;
  }
`;
const QuotesWrapper = styled.div`
  position: absolute;
  left: -20px;
  top: -10px;
`;
const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 960px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;


