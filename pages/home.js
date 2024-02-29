import React, { useContext } from "react";
import Navbar from "../newComponents/Navbar/Navbar";
import Link from 'next/link';
import { Roboto } from "next/font/google";

import NewShipmentTable from "../newComponents/newShipmentTable/Table"
import TransitShipmentTable from "../newComponents/transitShipmentTable/Table"
import CompleteShipmentTable from "../newComponents/completeShipment/Table"

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
    const { cartP } = useContext(TrackingContext);

    function handleNewShipment() {
        if (!cartP.productCount) {
            return toast.info("Cart is empty add some products")
        }
    }

    return (
        <>
            <Navbar currentPage={"Home"}/>
            <AddShipmentButton clickHandler={handleNewShipment} style={{ marginTop: 10, marginBottom: 5, headingWidth: "fit-content" }} heading={"ADD NEW SHIPMENT"} />
            <SectionHead style={{marginTop : 40, marginBottom : 0,width : "auto" }} heading={"Pending Shipments"} details={"Shipment that are not yet started are shown here."}/>
            <NewShipmentTable allShipmentsData={shipmentData}/>
            <SectionHead style={{marginTop : 40, marginBottom : 0,width : "auto" }} heading={"Shipments In Transit"} details={"Shipment that are not yet delivered are shown here."}/>
            <TransitShipmentTable allShipmentsData={shipmentData}/>
            <SectionHead style={{marginTop : 40, marginBottom : 0,width : "auto" }} heading={"Completed Shipments"} details={"Shipment that are successfully delivered are shown here."}/>
            <CompleteShipmentTable allShipmentsData={shipmentData}/>
        </>
    );
}

export default home;
