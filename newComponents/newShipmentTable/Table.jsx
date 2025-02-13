import React, { useContext } from "react";

import { TrackingContext } from "@/Context/Tracking";
import { toast } from "react-toastify";
import baseUrl from "@/baseUrl/url";

export default ({ setOpenDetailsPanel, setShipmentDetails, setAllTransitShipmentData, setAllCancelShipmentData, getProductData, pendingShipments, setAllPendingShipmentData }) => {
    const { startShipment, cancelShipment } = useContext(TrackingContext);
    console.log(pendingShipments);
    const convetTime = (time) => {
        const newTime = new Date(time);
        const dateTime = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(newTime);

        return dateTime;
    };

    async function startShipmentHandler(sender, receiver, index) {
        try {
            console.log("sender", sender);
            console.log("receiver", receiver);
            console.log("index", index);
            let shipmentAdd;
            await startShipment(sender, receiver, index);
            let newArray = pendingShipments.filter((shipment) => {
                if (shipment.id == index) {
                    shipmentAdd = shipment;
                    return false;
                } else {
                    return true;
                }
            });
            setAllPendingShipmentData(newArray);
            setAllTransitShipmentData((prev) => [...prev, shipmentAdd]);
            toast.success("Shipment successfully Started");
        } catch (error) {
            toast.error("Error" + ":" + error.message);
        }
    }

    async function updateUserProduct(productId, quantity) {
        try {
            const token = localStorage.getItem("token");

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const raw = JSON.stringify({
                data: {
                    quantity: quantity
                }
            });

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            await fetch(`${baseUrl}/api/product-users/${productId}`, requestOptions);
        } catch (e) {
            toast.error("Error" + ":" + error.message);
        }
    }

    async function getUserProduct(id) {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("uid");
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            let res = await fetch(`${baseUrl}/api/product-users?filters[productId][$eq]=${id}&filters[userid][$eq]=${userId}`, requestOptions);
            let data = await res.json();
            console.log(data);
            return {
                id: data.data[0].id,
                existingQuantity: data.data[0].attributes.quantity
            };
        } catch (e) {
            toast.error("Error" + ":" + error.message);
        }
    }

    async function updateCancelProductQuantity(shipment) {
        try {
            let shipmentData = await getProductData(shipment);

            for (let i = 0; i < shipmentData.length; i++) {
                const productId = parseInt(shipmentData[i][1]._hex, 16);
                const productQuantity = parseInt(shipmentData[i][0]._hex, 16);
                let productDetails = await getProduct(productId);
                let userProductDetails = await getUserProduct(productDetails.id);
                console.log(productQuantity, userProductDetails.existingQuantity);
                await updateUserProduct(userProductDetails.id, userProductDetails.existingQuantity + productQuantity);
            }
        } catch (e) {
            toast.error("Error" + ":" + error.message);
        }
    }

    async function cancelShipmentHandler(sender, receiver, shipmentId, shipment) {
        try {
            await updateCancelProductQuantity(shipment);
            await cancelShipment(sender, receiver, shipmentId);

            let shipmentAdd;
            let newArray = pendingShipments.filter((shipment) => {
                if (shipment.id == shipmentId) {
                    shipmentAdd = shipment;
                    return false;
                } else {
                    return true;
                }
            });
            console.log(shipmentAdd);
            setAllPendingShipmentData(newArray);
            setAllCancelShipmentData((prev) => {
                return [...prev, shipmentAdd];
            });
            toast.success("Shipment cancelled Shipments");
        } catch (error) {
            toast.error("Error" + ":" + error.message);
        }
    }

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

            let res = await fetch(`http://localhost:1337/api/products?filters[id][$eq]=${productId}`, requestOptions);
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
                            <th className="py-3 px-6 ">PickupDate</th>
                            <th className="py-3 px-6 ">Distance</th>
                            <th className="py-3 px-6 ">Price</th>
                            <th className="py-3 px-6 text-justify">Delivery Date</th>
                            <th className="py-3 px-6 ">Paid</th>

                            <th className="py-3 px-6 text-center ">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-600 divide-y  ">
                        {pendingShipments?.map((shipment, idx) => (
                            <tr key={shipment.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.sender.slice(0, 15)}...</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.receiver.slice(0, 15)}...</td>
                                <td className="px-6 py-4 whitespace-nowrap">{convetTime(shipment.pickupTime)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.distance} km</td>
                                <td className="px-6 py-4 whitespace-nowrap">{shipment.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* {shipment.deliveryTime} */}
                                    not defined
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">{shipment.isPaid ? "Completed" : "Not Complete"}</td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div style={{ display: "flex" }}>
                                        <h2
                                            onClick={() => {
                                                startShipmentHandler(shipment.sender, shipment.receiver, shipment.id);
                                            }}
                                            style={{ backgroundColor: "black", color: "lightgreen", padding: 7, cursor: "pointer", marginRight: 5 }}
                                        >
                                            Start Shipment
                                        </h2>
                                        <h2
                                            onClick={() => {
                                                cancelShipmentHandler(shipment.sender, shipment.receiver, shipment.id, shipment);
                                            }}
                                            style={{ backgroundColor: "black", color: "red", padding: 7, cursor: "pointer", marginRight: 5 }}
                                        >
                                            Cancel Shipment
                                        </h2>
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
                {pendingShipments?.length == 0 || pendingShipments == undefined ? <h1 style={{ padding: 20, fontWeight: "bold" }}>No Data To Show</h1> : ""}
            </div>
        </div>
    );
};
