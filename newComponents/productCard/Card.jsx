import React from 'react'
import styles from "./card.module.css"
import { Roboto } from "next/font/google";

import {  toast } from "react-toastify";


const roboto = Roboto({ weight: "400", subsets: ["latin"] });

function handleAddToCartNotification() {
   
 toast.info("Product added to cart")
    
}


function Card({userProductId,handleAddToCart,index, quantity,id,handleQuantityChange,name,image,description,price,itemsRemaining}) {
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
                <div className={styles.quantIcon} onClick={()=>{handleQuantityChange(id, quantity - 1,index)}}>
                    -
                </div>
                <p>{quantity}</p>
                <div className={styles.quantIcon} onClick={()=>{handleQuantityChange(id, quantity + 1,index)}}>
                    +
                </div>
            </div>
        </div>
        <div className={styles.quant}>
            <p>Items Remaining In Store :</p>
            <div className={styles.iconDiv}>
                
                {itemsRemaining == "0" ? <p style={{color:"red"}}>OUT OF STOCK</p> : itemsRemaining}
               
            </div>
        </div>
        <button disabled={itemsRemaining == "0" ? true : false}   className={styles.btn} onClick={()=>{handleAddToCart(id,quantity,index,userProductId);handleAddToCartNotification()}}>
            Add To Cart
        </button>
        
    </div>
  )
}

export default Card