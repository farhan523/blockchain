import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
// ES6 Modules
import { Random } from "random-js";

import { TrackingContext } from "@/Context/Tracking";

import { toast } from "react-toastify";
import baseUrl from "@/baseUrl/url";

export default ({ setCreateShipmentModel, createShipmentModel, createShipment }) => {
    const { cartP, setCart, products, setProducts } = useContext(TrackingContext);
    const router = useRouter();

    const [shipment, setShipment] = useState({
        receiver: "",
        pickupTime: "",
        distance: "",
        price: ""
    });

    async function updateProduct(quantity,userProductId,index) {
    let token = localStorage.getItem("token");

        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const raw = JSON.stringify({
                data: {
                    quantity:products[index].attributes.quantity - quantity
                }
            });

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            await fetch(`${baseUrl}/api/product-users/${userProductId}`, requestOptions)
        } catch (error) {
          toast.error(error.code + error.message);
          
        }
    }

    const createItem = async () => {
        let productRandomId = [];
        let productData = [];
        let request = [];

        for (let key in cartP.products) {
            productData.push({ quantity: cartP.products[key].quantity, productId: key });
            // Math.abs(new Random().int32())
            productRandomId.push(Math.abs(new Random().int32()));
            request.push(await updateProduct(cartP.products[key].quantity,cartP.products[key].userProductId,cartP.products[key].index))
        }
        console.log(productRandomId)
        console.log(productData)
       
        try {
            request.push(createShipment(shipment, productRandomId, productData));
            await Promise.all(request);
            // await createShipment(shipment, productRandomId, productData);
            setCart({ productCount: 0, products: {} });
            setCreateShipmentModel(false);
            router.reload();
        } catch (error) {
            setCreateShipmentModel(false);
            console.log("something went wrong while creating shipment", error.message);
            toast.error(error.code + error.message);
        }
    };
    return createShipmentModel ? (
        <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => {
                    setCreateShipmentModel(false);
                }}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8 ">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex justify-end">
                        <button
                            className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                            onClick={() => {
                                setCreateShipmentModel(false);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/svg" className="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                        <h4 className="text-lg font-medium text-gray-800">Add Shipment</h4>
                        <p className="text-[15px] text-gray-600">All the Products in the cart will be added to this shipment.</p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <div className="relative mt-3 ">
                                <input
                                    type="text"
                                    placeholder="receiver"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    onChange={(e) => {
                                        setShipment({
                                            ...shipment,
                                            receiver: e.target.value
                                        });
                                    }}
                                />
                            </div>
                            <div className="relative mt-3 ">
                                <input
                                    type="date"
                                    placeholder="pickupTime"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    onChange={(e) => {
                                        setShipment({
                                            ...shipment,
                                            pickupTime: e.target.value
                                        });
                                    }}
                                />
                            </div>
                            <div className="relative mt-3 ">
                                <input
                                    type="text"
                                    placeholder="distance in km"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    onChange={(e) => {
                                        setShipment({
                                            ...shipment,
                                            distance: e.target.value
                                        });
                                    }}
                                />
                            </div>
                            <div className="relative mt-3 ">
                                <input
                                    type="text"
                                    placeholder="charges for shipment in ethereum"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    onChange={(e) => {
                                        setShipment({
                                            ...shipment,
                                            price: e.target.value
                                        });
                                    }}
                                />
                            </div>
                            <button
                                onClick={() => {
                                    createItem();
                                }}
                                className="block w-full mt-3 px-4 py-3 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2  "
                            >
                                Create Shipment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};
