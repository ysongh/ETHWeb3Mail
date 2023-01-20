// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@hyperlane-xyz/core/interfaces/IOutbox.sol";
import "@hyperlane-xyz/core/interfaces/IInbox.sol";

contract EVMWeb3Mail {
    IOutbox outbox;
    IInbox inbox;
    
    mapping(address => string[]) public receiveEmails;
    mapping(address => string[]) public sentEmails;

    event ReceivedMessage(uint32 origin, bytes32 sender, address to);
    event SentMessage(uint32 destinationDomain, bytes32 recipient, address to);
    event NewEmail(address indexed to, string cid);

    constructor(address _outbox, address _inbox) {
        outbox = IOutbox(_outbox);
        inbox = IInbox(_inbox);
    }

    function sendMail(string calldata cid, address to) external {
        receiveEmails[to].push(cid);
        sentEmails[msg.sender].push(cid);
        emit NewEmail(to, cid);
    }

    function removeReceiveEmailByID(uint id, address to) external {
        delete receiveEmails[to][id];
    }

    function removeSentEmailByID(uint id, address to) external {
        delete sentEmails[to][id];
    }

    function sendMailToOtherChain(
        uint32 _destinationDomain,
        bytes32 _recipient,
        string calldata cid,
        address to
    ) external {
        bytes memory payload = abi.encode(
            cid, 
            to
        );
        sentEmails[msg.sender].push(cid);
        outbox.dispatch(_destinationDomain, _recipient, payload);
        emit SentMessage(_destinationDomain, _recipient, to);
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _payload
    ) external {
        (
            string memory cid,
            address to
        ) = abi.decode(
                _payload,
                (string, address)
            );
        receiveEmails[to].push(cid);
        
        emit ReceivedMessage(_origin, _sender, to);
        emit NewEmail(to, cid);
    }

    function getUserEmails(address _to) external view returns (string[] memory) {
        return receiveEmails[_to];
    }

    function getSentEmails(address _to) external view returns (string[] memory) {
        return sentEmails[_to];
    }
}