import baseUrl from "@/baseUrl/url";
import React from "react";

export default ({ getProductData, setOpenDetailsPanel, setShipmentDetails, setCreateShipmentModel, cancelShipmentData }) => {
    const convetTime = (time) => {
        const newTime = new Date(time);
        const dateTime = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(newTime);

        return dateTime;
    };

    async function getProduct(productId) {
        try {
            const token = localStorage.getItem("token");
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            let res = await fetch(`${baseUrl}/api/products?filters[id][$eq]=${productId}`, requestOptions);
            let data = await res.json();
            return data.data[0];
        } catch (e) {
            toast.error("Error" + ":" + e.message);
        }
    }

    async function setShipmentDetail(shipment) {
        try {
            let shipmentData = await getProductData(shipment);
            let shipmentDetails = [];
            shipmentData.forEach((shipment) => {
                const productId = parseInt(shipment[1]._hex, 16);
                const productQuantity = parseInt(shipment[0]._hex, 16);
                console.log(productId, productQuantity);
            });

            for (let i = 0; i < shipmentData.length; i++) {
                const productId = parseInt(shipmentData[i][1]._hex, 16);
                const productQuantity = parseInt(shipmentData[i][0]._hex, 16);
                let productDetails = await getProduct(productId);
                shipmentDetails.push({
                    name: productDetails.attributes.name,
                    description: productDetails.attributes.description,
                    imageUrl: productDetails.attributes.imageUrl,
                    quantity: productQuantity
                });
            }
            setOpenDetailsPanel(true);
            setShipmentDetails(shipmentDetails);
            console.log(shipmentDetails);
        } catch (e) {
            toast.error("Error" + ":" + e.message);
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-10">
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto ">
                <table className="w-full table-auto text-sm text-left ">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6 ">Sender</th>
                            <th className="py-3 px-6 ">Receiver</th>
                            <th className="py-3 px-6 ">PickupTime</th>
                            <th className="py-3 px-6 ">Distance</th>
                            <th className="py-3 px-6 ">Price</th>
                            <th className="py-3 px-6 ">Delivery Time</th>
                            <th className="py-3 px-6 ">Paid</th>

                            <th className="py-3 px-6 ">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-600 divide-y ">
                        {cancelShipmentData?.map((shipment, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.sender.slice(0, 15)}...</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.receiver.slice(0, 15)}...</td>
                                <td className="px-6 py-4 whitespace-nowrap">{convetTime(shipment.pickupTime)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.distance} km</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.deliveryTime}</td>
                                <td className="px-5 py-4 whitespace-nowrap">{shipment.isPaid ? "Completed" : "Not Complete"}</td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div style={{ display: "flex" }}>
                                        <h2 style={{ opacity: 0.5, backgroundColor: "black", color: "lightgreen", padding: 7, cursor: "pointer", marginRight: 5 }}>Start Shipment</h2>
                                        <h2 style={{ opacity: 0.5, backgroundColor: "black", color: "red", padding: 7, cursor: "pointer", marginRight: 5 }}>Cancel Shipment</h2>
                                        <h2
                                            onClick={() => {
                                                setShipmentDetail(shipment);
                                            }}
                                            style={{ backgroundColor: "black", color: "yellow", padding: 7, cursor: "pointer" }}
                                        >
                                            Details
                                        </h2>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {cancelShipmentData?.length == 0 || cancelShipmentData == undefined ? <h1 style={{ padding: 20, fontWeight: "bold" }}>No Data to show</h1> : ""}
            </div>
        </div>
    );
};
