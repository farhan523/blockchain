// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Tracking {
    enum ShipmentStatus {
        PENDING,
        CANCELLED,
        IN_TRANSIT,
        DELIVERED
    }

    struct Shipment {
        uint256 id;
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        uint256[] products;
        ShipmentStatus status;
        bool isPaid;
    }

    struct Product{
        uint256 quantity;
        uint256 productId;
    }

    mapping(address => Shipment[]) public dilieverShipments;
    mapping(address => Shipment[]) public receiveShipments;
    mapping(uint256 => address[]) public productHistory;
    mapping (uint256 => Product) public  productIdMapping;

    uint256 public shipmenCount;

    struct TyepShipment {
        uint256 id;
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        uint256[] products;
        bool isPaid;
    }

    TyepShipment[] tyepShipments;

    event ShipmentCreated(
        address indexed sender,
        address indexed receiver,
        uint256 pickupTime,
        uint256 distance,
        uint256 price
    );

    event ShipmentInTransit(
        address indexed sender,
        address indexed receiver,
        uint256 pickupTime
    );

    event ShipmentDelivered(
        address indexed sender,
        address indexed receiver,
        uint256 deliveryTime
    );

    event ShipmentPaid(
        address indexed sender,
        address indexed receiver,
        uint256 amount
    );

    event ShipmentCancelled(
        address indexed sender,
        address indexed receiver,
        uint256 shipmentId
    );

    constructor() {
        shipmenCount = 0;
    }

    function createShipment(address _receiver, uint256 _pickupTime, uint256 _distnce, uint256 _price,uint256[] memory products,Product[] memory productData) public {

            Shipment memory shipment = Shipment(dilieverShipments[msg.sender].length,msg.sender, _receiver, _pickupTime, 0, _distnce, _price,products,ShipmentStatus.PENDING,false);

            dilieverShipments[msg.sender].push(shipment);
            receiveShipments[_receiver].push(shipment);

            for(uint i=0; i < products.length; i++){ 
                productHistory[productData[i].productId].push(msg.sender);
                productIdMapping[products[i]] = productData[i];
            }  

            shipmenCount++;

            emit ShipmentCreated(msg.sender,_receiver,_pickupTime,_distnce,_price);
    }

    
    function cancelShipment(address _sender, address _receiver, uint256 shipmentId) public {
        Shipment storage dilieverShipment = dilieverShipments[_sender][shipmentId];
        Shipment storage receiverShipment = dilieverShipment;

        require(msg.sender == _sender, "you are not author of this transaction");

        for(uint i=0; i < receiveShipments[_receiver].length; i++){ 
                if(receiveShipments[_receiver][i].id == dilieverShipment.id){
                    receiverShipment = receiveShipments[_receiver][i];
                    break;
                }
            }  

        require(dilieverShipment.status != ShipmentStatus.CANCELLED, "Shipment is already cancelled");
        require(dilieverShipment.status != ShipmentStatus.DELIVERED, "Product is already dilievered cannot cancelled now");

        dilieverShipment.status = ShipmentStatus.CANCELLED;
        receiverShipment.status = ShipmentStatus.CANCELLED;

        emit ShipmentCancelled(msg.sender, _receiver,shipmentId);
    }


    function startShipment(address _sender, address _receiver, uint256 shipmentId) public {
        Shipment storage dilieverShipment = dilieverShipments[_sender][shipmentId];
        Shipment storage receiverShipment = dilieverShipment;

        require(msg.sender == _sender, "you are not author of this transaction");

        for(uint i=0; i < receiveShipments[_receiver].length; i++){ 
                if(receiveShipments[_receiver][i].id == dilieverShipment.id){
                    receiverShipment = receiveShipments[_receiver][i];
                    break;
                }
            }  

        require(dilieverShipment.status != ShipmentStatus.IN_TRANSIT, " Shipment already in transit.");
        require(dilieverShipment.status != ShipmentStatus.CANCELLED, " Shipment already cancelled.");
        require(dilieverShipment.status != ShipmentStatus.DELIVERED, " Shipment already dilievered.");



        dilieverShipment.status = ShipmentStatus.IN_TRANSIT;
        receiverShipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentInTransit(_sender, _receiver, dilieverShipment.pickupTime);
    }

    function completeShipment(address payable _sender, address _receiver, uint256 shipmentId,uint256 _price) public payable {
        Shipment storage dilieverShipment = dilieverShipments[_sender][shipmentId];
        Shipment storage shipment = dilieverShipment;
       

        for(uint i=0; i < receiveShipments[msg.sender].length; i++){ 
                if(receiveShipments[msg.sender][i].id == dilieverShipment.id){
                    shipment = receiveShipments[msg.sender][i];
                    break;
                }
        } 

        for(uint i=0; i < shipment.products.length; i++){ 
                productHistory[shipment.products[i]].push(_receiver);
            } 
       
        require(msg.value  >= _price, "Payment amount must match the price.");
        require(shipment.receiver == msg.sender, "Invalid receiver.");
        require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment not in transit.");
        require(shipment.status != ShipmentStatus.DELIVERED, "Shipment already dilievered");
        require(shipment.status != ShipmentStatus.CANCELLED, "Shipment cancelled cannot receive now");

        payable(_sender).transfer(msg.value);

        shipment.status = ShipmentStatus.DELIVERED;
        dilieverShipment.status = ShipmentStatus.DELIVERED;

        shipment.deliveryTime = block.timestamp;
        dilieverShipment.deliveryTime = block.timestamp;

        uint256 amount = shipment.price;

        shipment.isPaid = true;

        emit ShipmentDelivered(_sender,_receiver,shipment.deliveryTime);
        emit ShipmentPaid(_sender,_receiver,amount);
    }


    function getAllDilieverTransactions() public view returns (Shipment[] memory) {
            return dilieverShipments[msg.sender];
    }

    function getAllDilieverTransactionsLength() public view returns (uint256) {
            return dilieverShipments[msg.sender].length;
    }

    function getAllReceiveTransactions() public view returns (Shipment[] memory) {
            return receiveShipments[msg.sender];
    }

    function getAllReceiveTransactionsLength() public view returns (uint256) {
            return receiveShipments[msg.sender].length;
    }

    function getProductHistory(uint256 productId)public  view  returns (address[] memory){
        return productHistory[productId];
    }

    function getProductData(uint256 productId) public view returns  (Product memory){
        Product memory  productOrigional = productIdMapping[productId];
        return  productOrigional;
    }
}