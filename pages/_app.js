import "@/styles/globals.css";
import { useEffect } from "react";

// Inetrnal import

import { TrackingProvider } from "../Context/Tracking";
import { NavBar, Footer } from "../Components/index";
import CustomToastContainer from "../newComponents/CustomToastContainer";
 
export default function App({ Component, pageProps }) {

    useEffect(()=>{
        if (window.ethereum) {
            window.ethereum.on("chainChanged", () => {
              window.location.reload();
            });
            window.ethereum.on("accountsChanged", () => {
              window.location.reload();
            });
          }
    },[])

    return (
        <>
            <TrackingProvider>
            
                <CustomToastContainer />
                <Component {...pageProps} />
            </TrackingProvider>
            
        </>
    );
}
