// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@hyperlane-xyz/core/interfaces/IOutbox.sol";
import "@hyperlane-xyz/core/interfaces/IInbox.sol";

contract EVMWeb3Mail {
    IOutbox outbox;
    IInbox inbox;
    
    bytes32 public lastSender;
    string[] public messages;

    event ReceivedMessage(uint32 origin, bytes32 sender, bytes message);
    event SentMessage(uint32 destinationDomain, bytes32 recipient, string message);

    constructor(address _outbox, address _inbox) {
        outbox = IOutbox(_outbox);
        inbox = IInbox(_inbox);
    }

    function sendString(
        uint32 _destinationDomain,
        bytes32 _recipient,
        string calldata _message
    ) external {
        outbox.dispatch(_destinationDomain, _recipient, bytes(_message));
        emit SentMessage(_destinationDomain, _recipient, _message);
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external {
      lastSender = _sender;
      messages.push(string(_message));
      emit ReceivedMessage(_origin, _sender, _message);
    }

    function getMessages() external view returns (string[] memory) {
        return messages;
    }
}