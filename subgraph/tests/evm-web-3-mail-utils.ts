import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import {
  ReceivedMessage,
  SentMessage
} from "../generated/EVMWeb3Mail/EVMWeb3Mail"

export function createReceivedMessageEvent(
  origin: BigInt,
  sender: Bytes,
  to: Address
): ReceivedMessage {
  let receivedMessageEvent = changetype<ReceivedMessage>(newMockEvent())

  receivedMessageEvent.parameters = new Array()

  receivedMessageEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromUnsignedBigInt(origin))
  )
  receivedMessageEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromFixedBytes(sender))
  )
  receivedMessageEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return receivedMessageEvent
}

export function createSentMessageEvent(
  destinationDomain: BigInt,
  recipient: Bytes,
  to: Address
): SentMessage {
  let sentMessageEvent = changetype<SentMessage>(newMockEvent())

  sentMessageEvent.parameters = new Array()

  sentMessageEvent.parameters.push(
    new ethereum.EventParam(
      "destinationDomain",
      ethereum.Value.fromUnsignedBigInt(destinationDomain)
    )
  )
  sentMessageEvent.parameters.push(
    new ethereum.EventParam(
      "recipient",
      ethereum.Value.fromFixedBytes(recipient)
    )
  )
  sentMessageEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return sentMessageEvent
}
