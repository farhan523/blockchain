import React,{useContext,useState} from 'react'

import { TrackingContext } from '@/Context/Tracking'

import Navbar from '@/newComponents/Navbar/Navbar'
import Card from '@/newComponents/productCard/Card'

// const style = {
//     display : "flex",
//     justify
// }

const products = [
    {
        id:1,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name:"Nike Kwanza",
        description:"A pair of basketball shoes, has midtop style, lace-up",
        price:60,
        itemRemaining:23
    },
    {
        id:2,
        image: "https://plus.unsplash.com/premium_photo-1663127429325-3acefe582da5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name:"Nike Kwanza",
        description:"A pair of basketball shoes, has midtop style, lace-up",
        price:60,
        itemRemaining:23
    },
     {
        id:3,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name:"Nike Kwanza",
        description:"A pair of basketball shoes, has midtop style, lace-up",
        price:60,
        itemRemaining:23
    }
]

function Inventory() {
    const {cartP,setCart} = useContext(TrackingContext);
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (productId, quantity) => {
        console.log("ss")
        if(quantity <= 0)
            quantity = 1
        setQuantities(prevQuantities => ({
          ...prevQuantities,
          [productId]: {quantity}
        }));

        
      };

      const handleAddToCart = (productId, quantity)=>{
        console.log(quantity)
        if(cartP.products[productId] !== undefined){
            console.log("ss")
            setCart((prevQuantities)=>({
                
                    ...prevQuantities,
                  
                    products : {
                        ...prevQuantities.products,
                        [productId]:{
                            quantity : quantity
                        }
                    }
                
            }))
        }else{
            console.log("cc")
            setCart((prevQuantities)=>{
                return {
                    ...prevQuantities,
                    productCount: prevQuantities.productCount + 1,
                    products:{
                        ...prevQuantities.products,
                        [productId]:{
                       
                            quantity: quantity
                        }
                    }
                }
            })
        }
      }

  return (
    <>
        <Navbar currentPage={"Inventory"}/>

        <div style={{display: "flex", justifyContent: "space-around", width: "95%", flexWrap: "wrap"}}>
        {products.map((product)=>{
           
            return <Card handleAddToCart={handleAddToCart} key={product.id} handleQuantityChange={handleQuantityChange} id={product.id} image={product.image} description={product.description} name={product.name} price={product.price} quantity={quantities[product.id]?.quantity || 1 } itemsRemaining={product.itemRemaining} />
        })}
        </div>
    </>
  )
}

export default Inventory