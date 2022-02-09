import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FullButton from "./Buttons/FullButton";
import QuotesIcon from "../assets/svg/Quotes";

import axios from "axios";

const cardStyles = {
  container: {
    display: "flex",
    height: 100,
    width: 400,
    boxShadow: "0 0 3px 2px #cec7c759",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  container2: {
    display: "flex",
    height: 100,
    width: 400,
 
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  profilePicture: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    color: "white",
    height: 20,
    width: 20,
    borderRadius: "50%",
    padding: 10,
    fontWeight: "bold",
  },
  bio: {
      flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  chooseFile:{
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '20vw',
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    color: 'green',
},
  userName: {
    fontWeight: "bold",
  },
 
};


const BASE_URL =
  "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates";

export default function CurrencyConverter() {
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
    // <div style={{ backgroundImage: `url(${require("./currency.jpg")})` }}>
      <div>
       {/* <QuoteWrapper className="flexCenter darkBg radius8">
            <QuotesWrapper>
              <QuotesIcon />
            </QuotesWrapper>
            <div>
              <h4 className="font15 whiteColor">Currency Converter</h4>

               <p className="font15 whiteColor">
                <h1 className="conversion-result"  >{conversionRate || "0.0"}</h1>
              </p>
            </div>
          </QuoteWrapper> */}
          <br/>
        
       <div  >
            <div style={cardStyles.container}>
              <label style={cardStyles.userName}>
                Select Date
                <br />
                <br />
                <input
                style={cardStyles.chooseFile}
                  className="currency-date"
                  type="date"
                  max={new Date().toISOString().substring(0, 10)}
                  value={rateDate}
                  onChange={handleDateChange}
                />
              </label>
            </div>
          <br />
          <br />
          <form  onSubmit={handleSubmit}>
          <div style={cardStyles.container}>
          <div style={cardStyles.container2}>
           <label style={cardStyles.userName} >
            Currency Source
            <br />
            <br />
            <select
              className="currency-source"
              style={cardStyles.userName}
              onkeypress="limitKeypress(event,this.value,3)"
              value={currencySource}
              onChange={handleSourceChange}
              
            >
              {currencySymbols?.map((symbol) => (
                <option style={cardStyles.chooseFile} key={symbol}>{symbol}</option>
              ))}
            </select>
           </label>
           </div>
            <br />
            <br />
            <div style={cardStyles.container2}>
           <label style={cardStyles.userName}>
            Currency Dest
            <br />
            <br />
            <select
              className="currency-destination"
              style={cardStyles.userName}
              value={currencyDestination}
              onChange={handleDestinationChange}
            >
              {currencySymbols?.map((symbol) => (
                <option style={cardStyles.chooseFile} key={symbol}>{symbol}</option>
              ))}
            </select>
          </label>
          </div>
          </div>
          <br/>
           <div className="flexCenter darkBg radius8" style={cardStyles.container}>
       <h4 className="font15 whiteColor">Rate:</h4>
         <div>
       <p style={{color: "green"}}>
                <h1 className="conversion-result"  >{conversionRate || "0.0"}</h1>
              </p>
          </div>
       </div>
          <br/>
            
            <div style={cardStyles.container2} >
          <div style={cardStyles.container2} >
          <BtnWrapper >
            <FullButton className="find-rate" type="submit" title="Find Rate" /> 
          </BtnWrapper>
            </div>       
          <br />
          <div style={cardStyles.container2} >
          <BtnWrapper >
            <FullButton className="reset-fields" type="reset" title="Reset"  />
          </BtnWrapper>
          </div>
          </div>
          
        </form>
      </div>
    </div>
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


