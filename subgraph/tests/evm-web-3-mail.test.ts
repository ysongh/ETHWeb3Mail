import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import { ReceivedMessage } from "../generated/schema"
import { ReceivedMessage as ReceivedMessageEvent } from "../generated/EVMWeb3Mail/EVMWeb3Mail"
import { handleReceivedMessage } from "../src/evm-web-3-mail"
import { createReceivedMessageEvent } from "./evm-web-3-mail-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let origin = BigInt.fromI32(234)
    let sender = Bytes.fromI32(1234567890)
    let to = Address.fromString("0x0000000000000000000000000000000000000001")
    let newReceivedMessageEvent = createReceivedMessageEvent(origin, sender, to)
    handleReceivedMessage(newReceivedMessageEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ReceivedMessage created and stored", () => {
    assert.entityCount("ReceivedMessage", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ReceivedMessage",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "origin",
      "234"
    )
    assert.fieldEquals(
      "ReceivedMessage",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "1234567890"
    )
    assert.fieldEquals(
      "ReceivedMessage",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "to",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
