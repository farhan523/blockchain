import React from "react";
import styles from "./style.module.css";
import { Roboto } from "next/font/google";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function DataCard({heading = 0,percent = 0}) {
    return (
        <div className={styles.data}>
            <h1 style={{ padding: 10, fontWeight: "600" }}>{heading}</h1>
            <div style={{ width: 150, height: 150,alignSelf:"center",marginTop:"5%"}}>
                <CircularProgressbar   value={percent} text={`${percent}%`}/>
            </div>
        </div>
    );
}

const data = [{
    heading: "Pending Shipment",
    percent:"60"
},{
    heading: "Shipments In Transit",
    percent:"60"
},{
    heading: "Completed Shipments",
    percent:"60"
},{
    heading: "Cancelled Shipments",
    percent:"60"
}]

const roboto = Roboto({ weight: "700", subsets: ["latin"] });

function Profile({statistics}) {
    console.log(Object.keys(statistics))

    let data = Object.keys(statistics).map((category,index) => {
        console.log(category,statistics[category].count , statistics["Total Shipments"] )
        return <DataCard key={index} heading={category} percent={statistics["Total Shipments"]  == 0 ? 0 : statistics[category].count / (statistics["Total Shipments"] ) * 100  }/>
    })
    data.length = 4;
    
    return (
        <>
            <div className={styles.header}></div>
            <div className={styles.profile}></div>
            <div className={styles.credentials}>
                <h1 className={`${roboto.className} ${styles.personName}`}>Emma Smith</h1>
            </div>
            <div className={styles.datadiv}>
                {data}
                {/* {data.map((item,index)=> <DataCard key={index} heading={item.heading} percent={item.percent}/>)} */}
            </div>
        </>
    );
}

export default Profile;
