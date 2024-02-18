import "@/styles/globals.css";

// Inetrnal import

import { TrackingProvider } from "../Context/Tracking";
import { NavBar, Footer } from "../Components/index";

export default function App({ Component, pageProps }) {
    return (
        <>
            <TrackingProvider>
                <NavBar />
                <Component {...pageProps} />
            </TrackingProvider>
            <Footer />
        </>
    );
}
