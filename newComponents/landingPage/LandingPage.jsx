import Image from "next/image";
import styles from "./style.module.css";
import HeaderImage from "../../public/images/header.jpg";
import CenterImage from "../../public/images/center.png";


import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export default function LandingPage() {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.leftHeader}>
                    <div>
                        <h1 style={{ fontSize: "2rem",  }} className={roboto.className}>
                            Private,Secure
                            <br /> Borderless Crypto <br /> Payments
                        </h1>
                        <p style={{  marginTop: 10 }}>
                            The easiest way to grow <br /> your supply chain management
                        </p>
                    </div>
                </div>
                <div className={styles.rightHeader} style={{ width: "60%", backgroundColor: "#f0f8ff" }}>
                    <Image src={HeaderImage} width={"30%"} height={"30%"} style={{ mixBlendMode: "multiply", width: "100%", height: "100%" }} />
                </div>
            </div>
            <div className={styles.center}>
                <div className={styles.leftCenter} style={{ width: "30%",display:"flex",alignItems:"center" }}>
                    <Image src={CenterImage} width={"30%"} height={"30%"} style={{ height: "auto" }} />
                </div>
                <div className={styles.rightCenter} style={{ width: "55%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingRight: "5%" }}>
                    <div>
                        <h1 style={{ fontSize: "2rem"}} className={roboto.className}>
                            {" "}
                            What is Track and Trace?
                        </h1>
                        <p style={{ textAlign: "justify" }}>
                            In the supply chain industry, track and trace refers to the ability to identify the past and present locations of all product inventory, as well as a history of product custody. Track and trace requires following products
                            through a complex journey from raw material, through multiple geographic regions for processing and manufacturing, through regulatory control, and finally, to retailers and consumers. Tracking provenance throughout this
                            journey is crucial to ensuring product authenticity.
                        </p>
                        <br />
                        <p style={{  }}>
                            Track and trace is often a challenge for today’s supply chains due to outdated paper processes and disjointed data systems that slow down communication. The lack of data compatibility exposes supply chains to problems like
                            visibility gaps, inaccurate supply and demand predictions, manual errors, counterfeiting, and compliance violations.
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "#040c62", color: "white", padding: "5%" }}>
                <h1 style={{ fontSize: "2rem", color: "white", textAlign: "justify" }} className={roboto.className}>
                    Track and Trace with Blockchain
                </h1>
                <br />
                <p style={{ color: "white", textAlign: "justify" }}>
                    Blockchain technology can be used to build applications on which multiple parties can transact directly via a peer-to-peer network, without the need for a central authority to verify transactions. Each network participant has
                    access to a shared ledger that immutably and cryptographically records all transactions, and there is no single network owner.
                </p>
                <br />
                <p style={{ textAlign: "justify" }}>
                    With blockchain, supply chain companies can document production updates to a single shared ledger, which provides complete data visibility and a single source of truth. Because transactions are always time-stamped and up to date,
                    companies can query a product’s status and location at any point in time. This helps to combat issues like counterfeit goods, compliance violations, delays, and waste. In addition, immediate action can be taken during emergencies
                    (e.g., in the case of product recalls), and regulatory compliance is ensured by the ledger audit trail. Moreover, by combining blockchain with smart technology like Internet of Things, supply chains can automate tracking the
                    conditions of production, transportation, and quality control. Companies can also choose to share track and trace data with their customers as a way to verify product authenticity and ethical supply chain practices.
                </p>
            </div>
            <div  style={{width:"100%",padding:"2rem"}}>
                <h1 className={roboto.className} style={{ fontSize: "1rem", fontWeight:"bold",marginBottom:20 }} >
                    {" "}
                    Traditional Supply Chains
                </h1>
                <figure class="lb-none-v-margin lb-img">
                    <div class="lb-none-pad" bis_skin_checked="1">
                        <img style={{maxWidth:"100%",width:"100%"}} src="https://d1.awsstatic.com/blockchain_assets/Blockchain%20challenges.715d861d4a38ccdc64f43d5b72ee7f2b8fe711d0.png" alt="" title="" class="cq-dd-image" />
                    </div>
                </figure>
            </div>
            <div  style={{width:"100%",padding:"2rem"}}>
                <h1 className={roboto.className} style={{ fontSize: "1rem", fontWeight:"bold",marginBottom:20 }} >
                    {" "}
                    Supply Chains with Blockchain
                                    </h1>
                <figure class="lb-none-v-margin lb-img">
                    <div class="lb-none-pad" bis_skin_checked="1">
                        <img style={{maxWidth:"100%",width:"100%"}} src="https://d1.awsstatic.com/blockchain_assets/Blockchain%20benefits.7079ea79a4a625578c9aa81e198f2ad2c846e694.png" alt="" title="" class="cq-dd-image" />
                    </div>
                </figure>
            </div>
            <div style={{width:"100%",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",marginBottom:20}}>
                <div style={{width:'80%'}}>
                    <h1 className={roboto.className} style={{ fontSize: "1rem", fontWeight:"bold",marginBottom:20 }} >Industry Use Cases</h1>
                    <div  className={styles.uses} style={{display:"flex",marginBottom:50}}>
                        <img src="https://d1.awsstatic.com/blockchain_assets/Page-Illo_Blockchain_Agriculture.9228c23393c392b954257680f06510d766c8b7b4.png" />
                        <div>
                            <h1 className={roboto.className} style={{ fontSize: "1rem", fontWeight:"bold",marginBottom:20 }}>Food and Agriculture</h1>
                            <p>Track products throughout the supply chain to respond quickly in the event of food safety emergencies. Differentiate your brand from the rest of the market and empower customers by providing detailed food supply chain insights. Compensate small farmers quickly and equitably.</p>
                        </div>
                    </div>
                    <div  className={styles.uses} style={{display:"flex",marginBottom:50}}>
                        <img src="https://d1.awsstatic.com/blockchain_assets/Page-Illo_Blockchain_Paharma.d24d1f2bcd2f2323bfe1a8e509524a5dc058501f.png" />
                        <div>
                            <h1 className={roboto.className} style={{ fontSize: "1rem", fontWeight:"bold",marginBottom:20 }}>Pharmaceuticals</h1>
                            <p>Reduce counterfeit medicines. Minimize patient risk by reacting quickly to medication recalls, and reduce overall pharmaceutical costs..</p>
                        </div>
                    </div>
                    <div  className={styles.uses} style={{display:"flex",marginBottom:50}}>
                        <img src="https://d1.awsstatic.com/blockchain_assets/Page-Illo_Blockchain_Manufacturing.4610be6a7932af725cce8da35c7b14a4dd64b327.png" />
                        <div>
                            <h1 className={roboto.className} style={{ fontSize: "1rem", fontWeight:"bold",marginBottom:20 }}>Manufacturing</h1>
                            <p>Inform consumers about the provenance of their clothes and shoes to demonstrate authenticity and ethical practices. Track spare auto parts and streamline auto safety recall processes to save money and reduce the number of affected customers.</p>
                        </div>
                    </div>
                    <div className={styles.uses} style={{display:"flex",marginBottom:50}}>
                        <img src="https://d1.awsstatic.com/blockchain_assets/Page-Illo_Blockchain_Mining.5e758abdd57defe85ce5ddd48da041eef5fe86dd.png" />
                        <div>
                            <h1 className={roboto.className} style={{ fontSize: "1rem", fontWeight:"bold",marginBottom:20 }}>Mining</h1>
                            <p>Ensure ethical sourcing and authenticity of raw materials. Accurately track environmental impacts of production, revealing new opportunities for sustainability..</p>
                        </div>
                    </div>
                </div>
               
            </div>
            <div style={{height:"3rem",backgroundColor:"#051d40",color:"white",display:"flex",alignItems:"center",justifyContent:"space-around",flexWrap:"wrap"}}>
                <h1>2024 University Of Sargodha</h1>
                <div style={{display:"flex"}}>
                    <p style={{marginRight:"20px"}}>Privacy Policy</p>
                    <p>Term Of Use</p>
                </div>
            </div>
        </>
    );
}
