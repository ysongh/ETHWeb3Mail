import {
  ReceivedMessage as ReceivedMessageEvent,
  SentMessage as SentMessageEvent
} from "../generated/EVMWeb3Mail/EVMWeb3Mail"
import { ReceivedMessage, SentMessage } from "../generated/schema"

export function handleReceivedMessage(event: ReceivedMessageEvent): void {
  let entity = new ReceivedMessage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.origin = event.params.origin
  entity.sender = event.params.sender
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSentMessage(event: SentMessageEvent): void {
  let entity = new SentMessage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.destinationDomain = event.params.destinationDomain
  entity.recipient = event.params.recipient
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
