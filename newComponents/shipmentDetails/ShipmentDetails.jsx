"use-client";
import { useState, useEffect, useRef } from "react";
import close from "../../public/images/icons8-close-50.png";
import Image from "next/image";
import Card from "../productCard2/Card";

export default function ShipmentDetails({setOpenDetailsPanel,openDetailsPanel,shipmentDetails}) {
    const ref = useRef(null);

    function handleClick() {
        setOpenDetailsPanel(false);
    }

    return openDetailsPanel ? (
        <>
            <div ref={ref} className="shipmentDetails animate__animated">
                <Image src={close} style={{paddingTop:10, marginLeft: 5, marginRight: 5, cursor: "pointer" }} onClick={handleClick} alt="close" height={20} width={30} />
                <div className="shipmentItems">
                    {shipmentDetails.map((product,index)=> <Card id={index} quantity={product.quantity} name={product.name} description={product.description} image={product.imageUrl} />)}
                </div>
            </div>
        </>
    ): null;
}
