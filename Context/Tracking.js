import React, {useState,useEffect} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";


// INTERNAL IMPORTS
import tracking from "./Tracking.json"
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;
console.log(ContractABI,"abi")

// ---FETCHING SMART CONTRACT

const fetchContract = (signerOrProvider) =>{
   return new ethers.Contract(ContractAddress,ContractABI,signerOrProvider);
}

export const TrackingContext = React.createContext();

export const TrackingProvider = ({children}) =>{
    // STATE VARIABLE

    const DappName = "Product Tracking Dapp"
    const [currentUser,setCurrentUser] = useState("");
    const [cartP,setCart] = useState({productCount:0,products:{}});

    const createShipment = async (items,products,productData) =>{
        console.log(items);
        const {receiver, pickupTime, distance, price} = items;

        try{
            const web3modal  =  new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price,18),
                products,
                productData
            )

            await createItem.wait();
            console.log(createItem);
        }catch(error){
            console.log("error",error) 
            throw (error)
        }
    }

    const getAllShipment = async () =>{
        try{
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const shipments = await contract.getAllTransactions();
            const allShipments = shipments.map((shipment)=>({
                sender:shipment.sender,
                receiver:shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime:shipment.pickupTime.toNumber(),
                deliveryTime:shipment.deliveryTime.toNumber(),
                distance:shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status:shipment.status,
            }))

            return allShipments
        }catch(error){
            console.log("error in getting shipment",error)
        }
    };

    const getAllPendingShipment = async () =>{
        try{
            const web3modal  =  new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const shipments = await contract.getAllDilieverTransactions();
            const allShipments = [];
            console.log(shipments)
            shipments.forEach((shipment)=>{
                if(shipment.status == 0){
                    allShipments.push({
                        id:shipment.id,
                        sender:shipment.sender,
                        receiver:shipment.receiver,
                        price: ethers.utils.formatEther(shipment.price.toString()),
                        pickupTime:shipment.pickupTime.toNumber(),
                        deliveryTime:shipment.deliveryTime.toNumber(),
                        distance:shipment.distance.toNumber(),
                        isPaid: shipment.isPaid,
                        status:shipment.status,
                        products:shipment.products
                    })
                }
            })

            return allShipments
        }catch(error){
            console.log("error in getting pending shipment",error)
        }
    };

    const getAllTransitShipment = async () =>{
        try{
            const web3modal  =  new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const shipments = await contract.getAllDilieverTransactions();
            const allShipments = [];
            console.log(shipments)
            shipments.forEach((shipment)=>{
                if(shipment.status == 2){
                    allShipments.push({
                        id:shipment.id,
                        sender:shipment.sender,
                        receiver:shipment.receiver,
                        price: ethers.utils.formatEther(shipment.price.toString()),
                        pickupTime:shipment.pickupTime.toNumber(),
                        deliveryTime:shipment.deliveryTime.toNumber(),
                        distance:shipment.distance.toNumber(),
                        isPaid: shipment.isPaid,
                        status:shipment.status,
                        products:shipment.products
                    })
                }
            })

            return allShipments
        }catch(error){
            console.log("error in getting pending shipment",error)
        }
    };

    const getShipmentsCount = async () =>{
        try{
            if(!window.ethereum) return "install MetaMask";

            const accounts = await window.ethereum.request({
                method:"eth_accounts",
            })
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
            return shipmentsCount.toNumber();
        }catch(error){
             console.log("error while getting shipment count");
        }
    };

    const completeShipment = async (completeShip) =>{
        console.log(completeShip);

        const {receiver,index} = completeShip;

        try{
            if(!window.ethereum) return "install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            })

            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider  = new ethers.providers.Web3Provider(connection);

            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(
                receiver,
                accounts[0],
                index,
                10,
                {
                    value : ethers.utils.parseUnits("10",18),
                }
            )

            transaction.wait();
            console.log(transaction);
        }catch(error){
            console.log("error while completing shipment",error);
        }
    }

    const getShipment = async (index) =>{
        console.log(index * 1);

        try{
            if(!window.ethereum) return "install Metamask";

            const accounts  = await window.ethereum.request({
                method:"eth_accounts",
            })

            const provider = new ethers.providers.JsonRpcProvider;
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment(accounts[0], index * 1);

            const SingleShipment = {
                sender:shipment[0],
                receiver:shipment[1],
                pickupTime:shipment[2].toNumber(),
                deliveryTime:shipment[3].toNumber(),
                distance:shipment[4].toNumber(),
                price:ethers.utils.formatEther(shipment[5].toString()),
                status:shipment[6],
                isPaid:shipment[7],
            }

            return SingleShipment;
        }catch(error){
            console.log("sorry no shipment")
        }
    };

    const startShipment = async (sender,receiver,index)=>{
        
        try{
            if(!window.ethereum) return "install metamask";

            const accounts  = await window.ethereum.request({
                method:"eth_accounts",
            })

            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider  = new ethers.providers.Web3Provider(connection);

            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(
                sender,
                receiver,
                index  
            )

            shipment.wait();

            console.log(shipment);
        }catch(error){
            throw(error);
            console.log("error",error)
        }
    }  
    
    // check wallet connected

    const checkIfWalletConnected = async () =>{
        try{
            if(!window.ethereum) return "install metamask";
            
            const accounts  = await window.ethereum.request({
                method:"eth_accounts",
            })

            if(accounts.length){
                setCurrentUser[accounts[0]];
            }else{
                return "No account"
            }
        }catch(error){
            return "not connected";
        }
    }

    // connect wallet function 

    const connectWallet = async () =>{
        try{
            if(!window.ethereum) return "install metamask"

            const accounts  = await window.ethereum.request({
                method:"eth_requestAccounts",
            })

            setCurrentUser(accounts[0]);
        }catch(error){
            return "something went wrong"
        }
    }

    useEffect(()=>{
        connectWallet()
        checkIfWalletConnected()
    },[])

    return (
        <TrackingContext.Provider value={{
            connectWallet,
            createShipment,
            getAllShipment,
            completeShipment,
            getShipment,
            startShipment,
            getShipmentsCount,
            getAllPendingShipment,
            getAllTransitShipment,
            DappName,
            currentUser,
            cartP,
            setCart
        }}>

            {children}
        
        </TrackingContext.Provider>
    )
}