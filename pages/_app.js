import "@/styles/globals.css";

// Inetrnal import

import { TrackingProvider } from "../Context/Tracking";
import { NavBar, Footer } from "../Components/index";
import CustomToastContainer from "../newComponents/CustomToastContainer";

export default function App({ Component, pageProps }) {
    return (
        <>
            <TrackingProvider>
                <CustomToastContainer />
                <Component {...pageProps} />
            </TrackingProvider>
            
        </>
    );
}
