'use client'

import NavBar from "@/newComponents/Navbar/Navbar";
import React,{useState,useEffect} from "react";
import { MarketCap } from "@/newComponents/marketCap/Index";


export default () => {
    "use client";

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


    return isClient ? (
        <>
           
            <NavBar currentPage={"MarketOverview"}/>
            <MarketCap />
            <style>{`
.sc-byyDRY{
    height: fit-content !important;
    overflow-x: hidden;
}

body{
    height: fit-content !important;
    overflow-x: hidden;
}

table th{
    color: #9ba1a6;
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 13px;
    border-bottom: 1px solid #dfe3e6;
}

tr:first-child {
    position: sticky;
    top: 0;
    z-index: 100;
    background: white;
}

  table td:nth-of-type(2) {
    position: sticky;
    left: 0;
    background-color: white;
    /* z-index: 100; */
    /* box-shadow: 0px 0px 2px rgba(128,138,157,.12),0px 0px 24px rgba(128,138,157,.14); */
  }

  table th:nth-of-type(2) {
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 100;
    /* box-shadow: 0px 0px 2px rgba(128,138,157,.12),0px 0px 24px rgba(128,138,157,.14);     */
  }

table th:nth-of-type(1){
    width: 59px;
}


table th:nth-of-type(2){
    width: 170px;
    text-align:start
}

table th:nth-of-type(3){
    width: 125px;
}

table th:nth-of-type(4){
    width: 120px;
}

table th:nth-of-type(5){
    width: 110px;
}

table td:nth-of-type(1){
    color: #7A8291;
    font-weight: 400;
    font-size: 12px;
}

table tr{
    cursor: pointer;
    height: 46px !important;
}

table td:nth-of-type(2){
    color: 'black';
    font-weight: 500;
    font-size: 12px;
}

table td:nth-of-type(3){
    color: 'black';
    font-weight: 400;
    font-size: 12px;
   
}

table td:nth-of-type(4){
    color: #7A8291;
    font-weight: 400;
    font-size: 12px;
   
}

table td:nth-of-type(5){
    color: #17E7D6;
    font-weight: 600;
    font-size: 13px;  
}

.nameParentDiv{
    display: flex;
     justify-content: flex-start;
     align-items: center
}

.nameParentDiv img{
    height: 24px;
    margin-right: 5px
}

.nameParentDiv > p{
    font-family: 'Poppins';
     font-weight: 500;
    font-size: 12px;
    margin-right: 10px;
    text-align: left;
}

.nameParentDiv > p > span{
    color: #7a8291;
    margin-left: 5px
}


.swapBtnParentDiv{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content : center;
    align-items: center;
}

.swapBtn{
    width: 59px;
    height: 21px;
    border-radius: 19px;
    background-color: #112455;
    display: flex;
    justify-content: center;
    align-items:center;
    /* margin-left: 10px */
}

.swapBtn p{
    color: #17E7D6; 
    font-family: 'Montserrat'; 
    font-weight: 700; 
    font-size: 10
}

.tableChild{
    width: 600px;
}

/* g.highcharts-label{
    display: none;
} */

.highcharts-input-group{
    display: none;
}

.custom-selector {
    width: 88px;
    height: 22px;
    border-radius: 23px;
    border: 1px solid #17E7D6;
    /* padding-left: 5px; */
    box-sizing: border-box;
}

.custom-selector select {
    width: 88px;
    height: 22px;
    border-radius: 23px;
    font-size: 10px;
    text-align: center;
    font-weight: 700;
    background-color: transparent;
    border: 1px solid #17E7D6;
    color: #112455;
    font-family: Montserrat;
}

.custom-select {
    position: relative;
    display: inline-block;
    height: 22px;
    border-radius: 23px;
    width: 88px; /* Adjust the width as needed */
    font-family: Arial, sans-serif;
  }
  
  .selected-value {
    width: 88px;
    height: 22px;
    display: flex;
    border-radius: 23px;
    align-items: center;
    /* border: 1px solid #ccc; */
    cursor: pointer;
    user-select: none;
    justify-content: space-around;
    font-size: 10px;
    color: #112455;
    font-weight: 700;
  }

  
  
  .custom-options {
    display: none;
    position: absolute;
    width: 100%;
    max-height: 150px; /* Adjust the max height as needed */
    overflow-y: auto;
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    z-index: 1;
  }
  
  .custom-option {
    padding: 10px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 10px;
    color: #112455;
    overflow-x: hidden;
  }

  .custom-option img{
    padding-left: 3px;
  }
  
  .custom-option:hover {
    background: #f5f5f5;
  }
  
  .open {
    display: block;
  }
  


@media screen and (max-width:1500px) {
    .tableChild{
        width: 98%;
    }
}

@media screen and (max-width:900px){
    

    .glkkmo {
        width: 98% !important;
    }

}

@media screen and (max-width:637px) {
    table th:nth-of-type(2){
        box-shadow: 0px 0px 2px rgba(128,138,157,.12),0px 0px 24px rgba(128,138,157,.14);
            border-bottom: none;
        }
    
        table td:nth-of-type(2) {
            box-shadow: 0px 0px 2px rgba(128,138,157,.12),0px 0px 24px rgba(128,138,157,.14);    
            border-bottom: none;
          }
}

@media screen and (max-width: 500px) {
    /* .custom-selector {
        width: 50px;
    } */

    .custom-selector select{
        width: 57px;
    }
  }`}</style>
        </>
    ) : null;
};
