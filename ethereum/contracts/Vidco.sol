pragma solidity ^0.4.17;

contract Vidco {
    address public doctor;
    address public patient;
    bool public paid;

    function Vidco() public {
        paid = false;
    }

    modifier restricted() {
        require(msg.sender != patient);
        _;
    }

    function pay() public payable {
        patient = msg.sender;
        require(msg.value > 0.0010 ether);
        paid = true;
    }

    function recieve(address doc, uint256 fees) public restricted {
        require(paid == true);
        doctor = doc;
        doctor.transfer(fees);
        paid = false;
        patient.transfer(address(this).balance);
    }
}
