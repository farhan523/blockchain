import React, { useState, useContext, useEffect } from "react";

import { Table, Form, Services, Profile, CompleteShipment, GetShipment, StartShipment } from "../Components/index";

import { TrackingContext } from "../Context/Tracking";

const index = () => {
    const { currentUser, createShipment, getAllShipment, completeShipment, getShipment, startShipment, getShipmentsCount,cart,setCart } =
        useContext(TrackingContext);

    // State variable
    const [createShipmentModel, setCreateShipmentModel] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [startModal, setStartModal] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [getModel, setGetModel] = useState(false);

    // data state variable
    const [allShipmentsData, setAllShipmentsData] = useState();

    useEffect(() => {
        const getCampaignsData = getAllShipment();
        
        return async () => {
            const allData = await getCampaignsData;
            console.log("alldata",allData)
            setAllShipmentsData(allData);
        };
    }, []);
    
    return (
        <>
            <Services setOpenProfile={setOpenProfile} setCompleteModel={setCompleteModal} setGetModel={setGetModel} setStartModel={setStartModal} />
            <Table setCreateShipmentModel={setCreateShipmentModel} allShipmentsData={allShipmentsData} />
            <Form createShipmentModel={createShipmentModel} createShipment={createShipment} setCreateShipmentModel={setCreateShipmentModel} />
            <Profile openProfile={openProfile} setOpenProfile={setOpenProfile} currentUser={currentUser} getShipmentsCount={getShipmentsCount} />
            <CompleteShipment completeModal={completeModal} setCompleteModal={setCompleteModal} completeShipment={completeShipment} />
            <GetShipment getModel={getModel} setGetModel={setGetModel} getShipment={getShipment} />
            <StartShipment startModel={startModal} setStartModel={setStartModal} startShipment={startShipment} />
        </>
    );
};

export default index;
