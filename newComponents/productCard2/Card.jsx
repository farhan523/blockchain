import React from 'react'
import styles from "./card.module.css"
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });


function Card({userProductId,handleAddToCart,index, quantity,id,handleQuantityChange,name,image,description,price,itemsRemaining}) {
  return (
    <div key={id} className={styles.card}>

        <div className={styles.productImage} style={{backgroundImage:`url(${image})`}}>

        </div>
        <h1 className={`${roboto.className}`}>{name}</h1>
        <p className={`${roboto.className}`}>{description}</p>
        {/* <h2 className={`${roboto.className}`}>Price : {price}$</h2> */}
        <div className={styles.quant}>
            <p>Quantity :</p>
            <div className={styles.iconDiv}>
                
                <p>{quantity}</p>
                
            </div>
        </div>
      
        
        
    </div>
  )
}

export default Card