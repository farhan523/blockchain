import React, { useState } from "react";

import styles from "./style.module.css";
import { Roboto } from "next/font/google";
import { CirclesWithBar } from "react-loader-spinner";
import { toast } from "react-toastify";
import baseUrl from "@/baseUrl/url";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

function AddShipment() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState({});
    const [loader, setLoader] = useState(false);

    function resetState() {
        setName("");
        setDescription("");
        setImageUrl("");
        setQuantity("");
        setPrice("");
    }

    async function submitForm() {
        setLoader(true);
        const myHeaders = new Headers();
        let authToken = localStorage.getItem("token");
        let userid = localStorage.getItem("uid");

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${authToken}`);

        const raw = JSON.stringify({
            data: {
                name: name,
                description: description,
                imageUrl: imageUrl
            }
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            let response = await fetch(`${baseUrl}/api/products`, requestOptions);
            let data = await response.json();
            let productId = data.data.id;
            console.log(productId)
            const raw2 = JSON.stringify({
                data: {
                    quantity: quantity,
                    price: price,
                    userid,
                    productId:JSON.stringify(productId)
                }
            });
            requestOptions.body = raw2;
            response = await fetch(`${baseUrl}/api/product-users`, requestOptions);
            data = response.json();
            if (data.error) {
                toast.error(data.error.message);
            } else {
                toast.success("product added successfully");
                resetState();
            }
        } catch (error) {
            toast.error("Network Error try Again");
        } finally {
            setLoader(false);
        }
    }

    function submitProductData() {
        if (name.length < 3) {
            setError((prev) => ({ name: "product name length must be at least 3" }));
            return;
        }
        if (description.length < 5) {
            setError((prev) => ({ description: "description length must be at least 5 character" }));
            return;
        }

        submitForm();
    }

    return (
        <form>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <h1 className={roboto.className} style={{ paddingBottom: 10, paddingTop: 20, textAlign: "center", fontSize: 21, fontWeight: "bold" }}>
                    Add New Product
                </h1>

                <div className={styles.form}>
                    <h1 style={{ justifySelf: "left", fontWeight: "bold" }}>Name</h1>
                    <input
                        required={true}
                        value={name}
                        onChange={(e) => {
                            setError({});
                            setName(e.target.value);
                        }}
                        style={{ outline: "2px solid black", width: "80%", padding: 5, margin: 10 }}
                        type="text"
                    />
                    <p style={{ textAlign: "left", marginBottom: 20, color: "red" }}>{error["name"] ?? ""}</p>
                    <h1 style={{ justifySelf: "left", fontWeight: "bold" }}>Description</h1>
                    <input
                        required={true}
                        value={description}
                        onChange={(e) => {
                            setError({});
                            setDescription(e.target.value);
                        }}
                        style={{ outline: "2px solid black", width: "80%", padding: 5, margin: 10 }}
                        type="text"
                    />
                    <p style={{ textAlign: "left", marginBottom: 20, color: "red" }}>{error["description"] ?? ""}</p>
                    <h1 style={{ justifySelf: "left", fontWeight: "bold" }}>Image Url</h1>
                    <input
                        required={true}
                        value={imageUrl}
                        onChange={(e) => {
                            setError({});
                            setImageUrl(e.target.value);
                        }}
                        style={{ outline: "2px solid black", width: "80%", padding: 5, margin: 10 }}
                        type="text"
                    />
                    <h1 style={{ justifySelf: "left", fontWeight: "bold" }}>Quantity</h1>
                    <input
                        value={quantity}
                        onChange={(e) => {
                            setError({});
                            setQuantity(e.target.value);
                        }}
                        style={{ outline: "2px solid black", width: "80%", padding: 5, margin: 10 }}
                        type="text"
                    />
                    <h1 style={{ justifySelf: "left", fontWeight: "bold" }}>Price</h1>
                    <input
                        required={true}
                        placeholder="$"
                        value={price}
                        onChange={(e) => {
                            setError({});
                            setPrice(e.target.value);
                        }}
                        style={{ outline: "2px solid black", width: "80%", padding: 5, margin: 10 }}
                        type="text"
                    />

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "fir-content" }}>
                        <input
                            onClick={(e) => {
                                e.preventDefault();
                                submitProductData();
                            }}
                            type="submit"
                            value={" ADD PRODUCT"}
                            style={{ marginRight: 10, backgroundColor: "#051d40", width: "100%", color: "white", padding: 10, textAlign: "center", cursor: "pointer" }}
                            className={styles.btn}
                        />

                        <CirclesWithBar height="30" width="30" color="#6352EC" outerCircleColor="#6352EC" innerCircleColor="#6352EC" barColor="#6352EC" ariaLabel="circles-with-bar-loading" wrapperStyle={{}} wrapperClass="" visible={loader} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddShipment;
