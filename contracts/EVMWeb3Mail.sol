// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@hyperlane-xyz/core/interfaces/IOutbox.sol";
import "@hyperlane-xyz/core/interfaces/IInbox.sol";

contract EVMWeb3Mail {
    IOutbox outbox;
    IInbox inbox;
    
    bytes32 public lastSender;
    mapping(address => string[]) public emails;

    event ReceivedMessage(uint32 origin, bytes32 sender, address to);
    event SentMessage(uint32 destinationDomain, bytes32 recipient, address to);

    constructor(address _outbox, address _inbox) {
        outbox = IOutbox(_outbox);
        inbox = IInbox(_inbox);
    }

    function sendMail(
        uint32 _destinationDomain,
        bytes32 _recipient,
        string calldata cid,
        address to
    ) external {
        bytes memory payload = abi.encode(
            cid, 
            to
        );

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
      lastSender = _sender;
      emails[to].push(cid);
      emit ReceivedMessage(_origin, _sender, to);
    }

    function getUserEmails(address _to) external view returns (string[] memory) {
        return emails[_to];
    }
}