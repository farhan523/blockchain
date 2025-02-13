import React,{useContext} from 'react'
import {  toast } from "react-toastify";
import { TrackingContext } from "@/Context/Tracking";


export default ({setAllCancelShipmentData})=>{

  const { cancelShipment } = useContext(TrackingContext);

    const convetTime = (time)=>{
        const newTime = new Date(time);
        const dateTime = new Intl.DateTimeFormat("en-US",{
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }).format(newTime);

        return dateTime;
    }

    
    async function cancelShipmentHandler(sender,receiver,shipmentId){
      try{
          await cancelShipment(sender,receiver,shipmentId);

          let shipmentAdd;
          let newArray = transitShipmentsData.filter((shipment) => {
            if(shipment.id == shipmentId){
                shipmentAdd = shipment;
                return false;
            }else{
              return true;
            }
          });
          setAllTransitShipmentData(newArray);
          setAllCancelShipmentData((prev)=>{return [...prev,shipmentAdd]});
          toast.success("Shipment cancelled Shipments");
      }catch(error){
        toast.error("Error" + ":" + error.message)
      }
  }

    return (
      <div className='max-w-screen-xl mx-auto px-4 md:px-8 mb-10'>
        {/* <div className='items-start justify-between md:flex'>
            <div className='max-w-lg'>
                <h3 className='text-gray-800 text-xl font-bold sm:text-2xl'>
                    Create Tracking
                </h3>
                <p className='text-gray-600 mt-2 '>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>
            <div className='mt-3 md:mt-0 '> 
              <p onClick={()=>{setCreateShipmentModel(true)}} className='inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex'>
                Add Tracking
              </p>
            </div>
        </div> */}
        <div className='mt-12 shadow-sm border rounded-lg overflow-x-auto '>
          <table className='w-full table-auto text-sm text-left '>
            <thead className='bg-gray-50 text-gray-600 font-medium border-b'>
              <tr>
                <th className='py-3 px-6 '>
                  Sender
                </th>
                <th className='py-3 px-6 '>
                  Receiver
                </th>
                <th className='py-3 px-6 '>
                  PickupTime  
                </th>
                <th className='py-3 px-6 '>
                  Distance
                </th>
                <th className='py-3 px-6 '>
                  Price
                </th>
                <th className='py-3 px-6 '>
                  Delivery Time
                </th>
                <th className='py-3 px-6 '>
                  Paid
                </th>
               
                <th className='py-3 px-6 '>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='bg-white text-gray-600 divide-y'>
              {
                allShipmentsData?.map((shipment,idx)=>(
                    <tr key={idx}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {shipment.sender.slice(0,15)}...
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {shipment.receiver.slice(0,15)}...
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {convetTime(shipment.pickupTime)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {shipment.distance} km
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {shipment.price}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {shipment.deliveryTime}
                      </td>
                      <td className='px-5 py-4 whitespace-nowrap'>
                          {shipment.isPaid ? 'Completed' : "Not Complete"}
                      </td>
                      
                      <td className='px-6 py-4 whitespace-nowrap'>
                          <div style={{display: "flex"}}>
                          <h2 style={{opacity:0.5, backgroundColor : "black", color:"lightgreen", padding : 7, cursor : "pointer" ,marginRight : 5 }}>Start Shipment</h2>
                          <h2 style={{backgroundColor : "black", color:"red", padding : 7, cursor : "pointer" ,marginRight : 5 }}>Cancel Shipment</h2>
                          <h2 style={{backgroundColor : "black", color:"yellow", padding : 7, cursor : "pointer" , }}>Details</h2>
                          </div>
                      </td>
                    </tr>
                ))
              }
              {
                transitShipmentsData?.map((shipment,idx)=>(
                    <tr key={shipment.id}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {shipment.sender.slice(0,15)}...
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {shipment.receiver.slice(0,15)}...
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {convetTime(shipment.pickupTime)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {shipment.distance} km
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {shipment.price}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                          {shipment.deliveryTime}
                      </td>
                      <td className='px-5 py-4 whitespace-nowrap'>
                          {shipment.isPaid ? 'Completed' : "Not Complete"}
                      </td>
                      
                      <td className='px-6 py-4 whitespace-nowrap'>
                          <div style={{display: "flex"}}>
                          <h2 style={{opacity:0.5, backgroundColor : "black", color:"lightgreen", padding : 7, cursor : "pointer" ,marginRight : 5 }}>Start Shipment</h2>
                          <h2  onClick={()=>{cancelShipmentHandler(shipment.sender,shipment.receiver,shipment.id)}} style={{backgroundColor : "black", color:"red", padding : 7, cursor : "pointer" ,marginRight : 5 }}>Cancel Shipment</h2>
                          <h2 style={{backgroundColor : "black", color:"yellow", padding : 7, cursor : "pointer" , }}>Details</h2>
                          </div>
                      </td>
                    </tr>
                ))
              }
            </tbody>
          </table>
          {transitShipmentsData.length == 0 ? <h1 style={{padding:20, fontWeight:'bold'}}>No Data To Show</h1> : ""}
        </div>
      </div>
    )
}