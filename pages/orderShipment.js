import React,{useContext,useState,useEffect} from 'react'
import Navbar from '@/newComponents/Navbar/Navbar'

import ReceiveShipmentTable from "../newComponents/receiveShipment/Table"
import CompleteShipmentTable from "../newComponents/completeShipment/Table"

import ShipmentDetails from '@/newComponents/shipmentDetails/ShipmentDetails'

import { Roboto } from "next/font/google";
import { TrackingContext } from '@/Context/Tracking';

const roboto = Roboto({ weight: "400", subsets: ["latin"] });


function SectionHead({ style, heading,details }) {

    return (
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: style.marginTop, marginBottom: style.marginBottom }}>
          <div style={{ width: "80%", color: "rgb(5,29,64)", paddingLeft : 10 }}>
              <h1 className={`${roboto.className}`} style={{fontSize : 25, width: style.headingWidth, fontWeight: 700 }}>
                  {heading}
              </h1>
              <p style={{paddingTop : 10}} className={roboto.className}>{details}</p>
          </div>
      </div>
  );
  }

function orderShipment() {
    const {getProductData,getAllReceiveShipment,getAllReceiveShipmentCompleted, connectWallet} = useContext(TrackingContext)
    const [receiveShipmentsData,setReceivesShipmentData] = useState([]);
    const [completeShipmentsData,setAllCompleteShipmentsData] = useState([]);
    const [openDetailsPanel,setOpenDetailsPanel] = useState(false);
    const [shipmentDetails,setShipmentDetails] = useState([]);




    useEffect(() => {
        const receiveShipmentData = getAllReceiveShipment();
        const completeShipmentData = getAllReceiveShipmentCompleted();
        
        return async () => {
            await connectWallet()
            const receiveShipments = await receiveShipmentData;
            console.log("rece",receiveShipments)
            const completeShipments = await completeShipmentData;
          
            setReceivesShipmentData(receiveShipments);
            setAllCompleteShipmentsData(completeShipments);
        };
    }, []);

  return (
    <>
        <ShipmentDetails setOpenDetailsPanel={setOpenDetailsPanel} openDetailsPanel={openDetailsPanel} shipmentDetails={shipmentDetails} />
        <Navbar currentPage={"OrderedShipment"}/>
        <SectionHead style={{marginTop : 40, marginBottom : 0,width : "auto" }} heading={"Shipments in Transits"} details={"All the Shipments deliver to you by others will be shown here, you can complete them here."}/>
        <ReceiveShipmentTable setOpenDetailsPanel={setOpenDetailsPanel} setShipmentDetails={setShipmentDetails} getProductData={getProductData} receiveShipmentsData={receiveShipmentsData} setReceivesShipmentData={setReceivesShipmentData} setAllCompleteShipmentsData={setAllCompleteShipmentsData} />
        <SectionHead style={{marginTop : 40, marginBottom : 0,width : "auto" }} heading={"Received Shipments"} details={"All the Shipments successfully received by you will be shown here"}/>
        <CompleteShipmentTable setOpenDetailsPanel={setOpenDetailsPanel} setShipmentDetails={setShipmentDetails} getProductData={getProductData} completeShipmentData={completeShipmentsData}/>
    </>
    
  )
}

export default orderShipment