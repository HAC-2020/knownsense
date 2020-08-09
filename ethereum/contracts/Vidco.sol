pragma solidity ^0.4.17;

contract Vidco {
    address public doctor;
    address public patient;
    bool public paid;
    bool public firstPayment;

    function Vidco() public {
        paid = false;
        firstPayment = false;
    }

    function pay(address docId) public payable {
        patient = msg.sender;
        doctor = docId;
        require(msg.value > 0.0010 ether);
        paid = true;
        firstPayment = true;
    }

    function addOn() public payable {
        require(firstPayment == true);
        require(msg.value > 0.0010 ether);
    }

    function recieve(uint256 fees) public {
        require(firstPayment == true);
        doctor.transfer(fees);
        paid = false;
        patient.transfer(address(this).balance);
    }
}
