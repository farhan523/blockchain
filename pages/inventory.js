import React, { useContext, useEffect, useState } from "react";

import { TrackingContext } from "@/Context/Tracking";

import Navbar from "@/newComponents/Navbar/Navbar";
import Card from "@/newComponents/productCard/Card";
import baseUrl from "@/baseUrl/url";
import { toast } from "react-toastify";


// const style = {
//     display : "flex",
//     justify
// }

const products = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Nike Kwanza",
        description: "A pair of basketball shoes, has midtop style, lace-up",
        price: 60,
        itemRemaining: 23
    },
    {
        id: 2,
        image: "https://plus.unsplash.com/premium_photo-1663127429325-3acefe582da5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Nike Kwanza",
        description: "A pair of basketball shoes, has midtop style, lace-up",
        price: 60,
        itemRemaining: 23
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Nike Kwanza",
        description: "A pair of basketball shoes, has midtop style, lace-up",
        price: 60,
        itemRemaining: 23
    }
];

function Inventory() {
    const { cartP, setCart,products,setProducts } = useContext(TrackingContext);
    const [quantities, setQuantities] = useState({});

    async function getProducts() {
        try {
            const token = localStorage.getItem("token");
            const uid = localStorage.getItem("uid")
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            let productData = await fetch(`${baseUrl}/api/product-users?filters[userid][$eq]=${uid}`, requestOptions)
            let data = await productData.json();
            
            let products = [];

            for(let i=0;i<data.data.length;i++){
                let productId = data.data[i].attributes.productId;
                let userProductId = data.data[i].id;
                let productDetails = await fetch(`${baseUrl}/api/products?filters[id][$eq]=${productId}`, requestOptions);
                let res = await productDetails.json();
                products.push({
                    id:res.data[0].id,
                    userProductId,
                    attributes:{
                        imageUrl:res.data[0].attributes.imageUrl,
                        description:res.data[0].attributes.description,
                        name:res.data[0].attributes.name,
                        price:res.data[0].attributes,
                        quantity:data.data[i].attributes.quantity,
                        price:data.data[i].attributes.price
                    }
                })
            }
            console.log(data)
            setProducts(products);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProducts()
    }, []);

    const handleQuantityChange = (productId, quantity,index) => {
        
        if (quantity < 0) quantity = 0;
        if(quantity > products[index].attributes.quantity){
            toast.info(`only ${quantity - 1} items remaining cannot add more`)
            return;
        }
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: { quantity }
        }));
    };

    const handleAddToCart = (productId, quantity,index,userProductId) => {
        console.log(quantity);
        if (cartP.products[productId] !== undefined) {
            console.log(cartP);
            console.log("ss");
            setCart((prevQuantities) => ({
                ...prevQuantities,
                productCount: prevQuantities.productCount - prevQuantities.products[productId].quantity + quantity,
                products: {
                    ...prevQuantities.products,
                    [productId]: {
                        userProductId,
                        index,
                        quantity: quantity
                    }
                }
            }));
        } else {
            console.log(cartP);

            setCart((prevQuantities) => {
                return {
                    ...prevQuantities,
                    productCount: prevQuantities.productCount + quantity,
                    products: {
                        ...prevQuantities.products,
                        [productId]: {
                            userProductId,
                            index,
                            quantity: quantity
                        }
                    }
                };
            });
        }
    };

    return (
        <>
            <Navbar currentPage={"Inventory"} />

            <div style={{ display: "flex", justifyContent: "space-around", width: "95%", flexWrap: "wrap" }}>
                {products.map((product,index) => {
                    return (
                        <Card
                            userProductId={product.userProductId}
                            index = {index}
                            handleAddToCart={handleAddToCart}
                            key={product.id}
                            handleQuantityChange={handleQuantityChange}
                            id={product.id}
                            image={product.attributes.imageUrl}
                            description={product.attributes.description}
                            name={product.attributes.name}
                            price={product.attributes.price}
                            quantity={quantities[product.id]?.quantity || 0}
                            itemsRemaining={product.attributes.quantity}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Inventory;
