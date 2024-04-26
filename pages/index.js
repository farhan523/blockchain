import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";


import { TrackingContext } from "../Context/Tracking";
import LandingPage from "@/newComponents/landingPage/LandingPage";
import Navbar from "@/newComponents/NavBarLandingPage/Navbar";

const index = () => {
    
    return (
        <>
            {/* <div style={{height:100,backgroundColor:"yellow",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
            <Link href={"/Login"}>
                <h1 style={{backgroundColor:"black",color:"white",padding:10,cursor:"pointer",margin:20 }}>Login</h1>
            </Link>
            <Link href={"/Signup"}>
                <h1 style={{backgroundColor:"black",color:"white",padding:10,cursor:"pointer",margin:20 }}>SignUp</h1>
            </Link>
        </div> */}
            <Navbar/>
            <LandingPage/>
            
        </>
    );
};

export default index;
