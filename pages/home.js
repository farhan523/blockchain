import React, { useContext,useState,useEffect,useLayoutEffect } from "react";
import Navbar from "../newComponents/Navbar/Navbar";
import Link from 'next/link';
import { Roboto } from "next/font/google";
import { useRouter } from 'next/navigation'


import NewShipmentTable from "../newComponents/newShipmentTable/Table"
import TransitShipmentTable from "../newComponents/transitShipmentTable/Table"
import CompleteShipmentTable from "../newComponents/completeShipment/Table"
import CancelShipmentTable from "../newComponents/cancelShipment/Table"

import ShipmentDetails from "../newComponents/shipmentDetails/ShipmentDetails";


import { Form } from "@/Components";

import {  toast } from "react-toastify";
import { TrackingContext } from "@/Context/Tracking";

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

function AddShipmentButton({ clickHandler, style, heading }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: style.marginTop, marginBottom: style.marginBottom }}>
            <div style={{ width: "80%", color: "rgb(5,29,64)" }}>
                <h1 onClick={clickHandler} className={`${roboto.className} AddShipmentButton`} style={{borderRadius:10, cursor: "pointer", width: style.headingWidth, fontWeight: 700, backgroundColor: "rgb(57,194,199)", padding: "15px 10px 15px 10px" }}>
                    {heading}
                </h1>
            </div>
        </div>
    );
}

const shipmentData = [{
  sender: "0xdc8CdBF3bC43Ea46C68157f68983ba82FD306cc6",
  receiver : "0xc62dA8E315DbD80D3D1DcC2221e511e66B7AE08f",
  pickupTime : new Date().getTime(),
  distance : 200,
  price : 100,
  deliveryTime : 99,
  isPaid : false,
  status: 0,
},{
  sender: "0xdc8CdBF3bC43Ea46C68157f68983ba82FD306cc6",
  receiver : "0xc62dA8E315DbD80D3D1DcC2221e511e66B7AE08f",
  pickupTime : new Date().getTime(),
  distance : 200,
  price : 100,
  deliveryTime : 99,
  isPaid : false,
  status: 0,
},
{
  sender: "0xdc8CdBF3bC43Ea46C68157f68983ba82FD306cc6",
  receiver : "0xc62dA8E315DbD80D3D1DcC2221e511e66B7AE08f",
  pickupTime : new Date().getTime(),
  distance : 200,
  price : 100,
  deliveryTime : 99,
  isPaid : false,
  status: 0,
},{
  sender: "0xdc8CdBF3bC43Ea46C68157f68983ba82FD306cc6",
  receiver : "0xc62dA8E315DbD80D3D1DcC2221e511e66B7AE08f",
  pickupTime : new Date().getTime(),
  distance : 200,
  price : 100,
  deliveryTime : 99,
  isPaid : false,
  status: 0,
},{
  sender: "0xdc8CdBF3bC43Ea46C68157f68983ba82FD306cc6",
  receiver : "0xc62dA8E315DbD80D3D1DcC2221e511e66B7AE08f",
  pickupTime : new Date().getTime(),
  distance : 200,
  price : 100,
  deliveryTime : 99,
  isPaid : false,
  status: 0,
}]


function home() {
    const {connectWallet,getProductData,getProductHistory, cartP,createShipment,getAllPendingShipment,getAllTransitShipment,getAllCancelShipment, getAllCompleteShipment,currentUser } = useContext(TrackingContext);
    const [createShipmentModel, setCreateShipmentModel] = useState(false);

    // data state variable
    const [pendingShipmentsData, setAllPendingShipmentData] = useState([]);
    const [transitShipmentsData, setAllTransitShipmentData] = useState([]);
    const [cancelShipmentData,setAllCancelShipmentData] = useState([]);
    const [completeShipmentData,setAllCompleteShipmentData] = useState([]);
    const [shipmentDetails,setShipmentDetails] = useState([]);
    const [logIn,setLogIn] = useState(true);
    const [openDetailsPanel,setOpenDetailsPanel] = useState(false);

    const router = useRouter()


    function checkIfUserLogin(){
        const token = localStorage.getItem("token");
        if(!token){
            router.replace("/Login");
        }else
            setLogIn(true);
    }

    useLayoutEffect(()=>{
        checkIfUserLogin();
    },[])

    async function checkWallet(){
        let res = await connectWallet();
        return res;
    }

    // getProductHistory(23);

    useEffect(() => {

       
        let res = checkWallet();
        
        const pendingShipmentData = getAllPendingShipment();
        const transitShipments = getAllTransitShipment();
        const cancelShipments = getAllCancelShipment();
        const completeShipments = getAllCompleteShipment();
       
        
        return async () => {
          
                res = await res;
                if(res)
                    return  toast.info("install metamask to show data");
            
                  
            
            const pendingShipments = await pendingShipmentData;
            const transitShipment = await transitShipments;
            const cancelShipment = await cancelShipments;
            const completeShipment = await completeShipments;
            console.log("alldata",pendingShipments)
            setAllPendingShipmentData(pendingShipments);
            setAllTransitShipmentData(transitShipment);
            setAllCancelShipmentData(cancelShipment);
            setAllCompleteShipmentData(completeShipment);
        };
    }, []);
    

    function handleNewShipment() {
        if (!cartP.productCount) {
            return toast.info("Cart is empty add some products")
        }else{
            setCreateShipmentModel(true);
        }
    }

    return logIn ? (
        <>
            <ShipmentDetails setOpenDetailsPanel={setOpenDetailsPanel} openDetailsPanel={openDetailsPanel} shipmentDetails={shipmentDetails} />
            <Navbar currentPage={"Home"}/>
            <AddShipmentButton clickHandler={handleNewShipment} style={{ marginTop: 10, marginBottom: 5, headingWidth: "fit-content" }} heading={"ADD NEW SHIPMENT"} />
            <Form createShipmentModel={createShipmentModel} createShipment={createShipment} setCreateShipmentModel={setCreateShipmentModel} />
            <SectionHead style={{marginTop : 40, marginBottom : 0,width : "auto" }} heading={"Pending Shipments"} details={"Shipment that are not yet started are shown here."}/>
            <NewShipmentTable setOpenDetailsPanel={setOpenDetailsPanel} setShipmentDetails={setShipmentDetails} getProductData={getProductData} setAllCancelShipmentData={setAllCancelShipmentData} setAllTransitShipmentData={setAllTransitShipmentData} allShipmentsData={shipmentData} setAllPendingShipmentData={setAllPendingShipmentData} pendingShipments={pendingShipmentsData}/>
            <SectionHead style={{marginTop : 40, marginBottom : 0,width : "auto" }} heading={"Shipments In Transit"} details={"Shipment that are not yet delivered are shown here."}/>
            <TransitShipmentTable getProductData={getProductData} setOpenDetailsPanel={setOpenDetailsPanel} setShipmentDetails={setShipmentDetails}  setAllCancelShipmentData={setAllCancelShipmentData} transitShipmentsData={transitShipmentsData} allShipmentsData={shipmentData} setAllTransitShipmentData={setAllTransitShipmentData}/>
            <SectionHead style={{marginTop : 40, marginBottom : 0,width : "auto" }} heading={"Completed Shipments"} details={"Shipment that are successfully delivered are shown here."}/>
            <CompleteShipmentTable getProductData={getProductData} setOpenDetailsPanel={setOpenDetailsPanel} setShipmentDetails={setShipmentDetails} allShipmentsData={shipmentData} completeShipmentData={completeShipmentData}/>
            <SectionHead style={{marginTop : 40, marginBottom : 0,width : "auto" }} heading={"Cancelled Shipments"} details={"Shipment that are cancelled either by you or receiver are shown here."}/>
            <CancelShipmentTable getProductData={getProductData} setOpenDetailsPanel={setOpenDetailsPanel} setShipmentDetails={setShipmentDetails} cancelShipmentData={cancelShipmentData}/>
        </>
    ) : null;
}

export default home;
