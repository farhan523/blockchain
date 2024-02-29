import React from 'react'
import styles from "./card.module.css"
import { Roboto } from "next/font/google";

import {  toast } from "react-toastify";


const roboto = Roboto({ weight: "400", subsets: ["latin"] });

function handleAddToCartNotification() {
   
 toast.info("Product added to cart")
    
}


function Card({handleAddToCart, quantity,id,handleQuantityChange,name,image,description,price,itemsRemaining}) {
  return (
    <div key={id} className={styles.card}>

        <div className={styles.productImage} style={{backgroundImage:`url(${image})`}}>

        </div>
        <h1 className={`${roboto.className}`}>{name}</h1>
        <p className={`${roboto.className}`}>{description}</p>
        <h2 className={`${roboto.className}`}>{price}$</h2>
        <div className={styles.quant}>
            <p>Quantity</p>
            <div className={styles.iconDiv}>
                <div className={styles.quantIcon} onClick={()=>{handleQuantityChange(id, quantity - 1)}}>
                    -
                </div>
                <p>{quantity}</p>
                <div className={styles.quantIcon} onClick={()=>{handleQuantityChange(id, quantity + 1)}}>
                    +
                </div>
            </div>
        </div>
        <div className={styles.quant}>
            <p>Items Remaining In Store :</p>
            <div className={styles.iconDiv}>
                
                <p>{itemsRemaining}</p>
               
            </div>
        </div>
        <div className={styles.btn} onClick={()=>{handleAddToCart(id,quantity);handleAddToCartNotification()}}>
            <h1>Add To Cart</h1>
        </div>
        
    </div>
  )
}

export default Card