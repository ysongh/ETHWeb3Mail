// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ReceivedMessage extends ethereum.Event {
  get params(): ReceivedMessage__Params {
    return new ReceivedMessage__Params(this);
  }
}

export class ReceivedMessage__Params {
  _event: ReceivedMessage;

  constructor(event: ReceivedMessage) {
    this._event = event;
  }

  get origin(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get sender(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class SentMessage extends ethereum.Event {
  get params(): SentMessage__Params {
    return new SentMessage__Params(this);
  }
}

export class SentMessage__Params {
  _event: SentMessage;

  constructor(event: SentMessage) {
    this._event = event;
  }

  get destinationDomain(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get recipient(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class EVMWeb3Mail extends ethereum.SmartContract {
  static bind(address: Address): EVMWeb3Mail {
    return new EVMWeb3Mail("EVMWeb3Mail", address);
  }

  emails(param0: Address, param1: BigInt): string {
    let result = super.call("emails", "emails(address,uint256):(string)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromUnsignedBigInt(param1)
    ]);

    return result[0].toString();
  }

  try_emails(param0: Address, param1: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("emails", "emails(address,uint256):(string)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromUnsignedBigInt(param1)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getUserEmails(_to: Address): Array<string> {
    let result = super.call(
      "getUserEmails",
      "getUserEmails(address):(string[])",
      [ethereum.Value.fromAddress(_to)]
    );

    return result[0].toStringArray();
  }

  try_getUserEmails(_to: Address): ethereum.CallResult<Array<string>> {
    let result = super.tryCall(
      "getUserEmails",
      "getUserEmails(address):(string[])",
      [ethereum.Value.fromAddress(_to)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toStringArray());
  }

  lastSender(): Bytes {
    let result = super.call("lastSender", "lastSender():(bytes32)", []);

    return result[0].toBytes();
  }

  try_lastSender(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("lastSender", "lastSender():(bytes32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _outbox(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _inbox(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class HandleCall extends ethereum.Call {
  get inputs(): HandleCall__Inputs {
    return new HandleCall__Inputs(this);
  }

  get outputs(): HandleCall__Outputs {
    return new HandleCall__Outputs(this);
  }
}

export class HandleCall__Inputs {
  _call: HandleCall;

  constructor(call: HandleCall) {
    this._call = call;
  }

  get _origin(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _sender(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get _payload(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class HandleCall__Outputs {
  _call: HandleCall;

  constructor(call: HandleCall) {
    this._call = call;
  }
}

export class SendMailCall extends ethereum.Call {
  get inputs(): SendMailCall__Inputs {
    return new SendMailCall__Inputs(this);
  }

  get outputs(): SendMailCall__Outputs {
    return new SendMailCall__Outputs(this);
  }
}

export class SendMailCall__Inputs {
  _call: SendMailCall;

  constructor(call: SendMailCall) {
    this._call = call;
  }

  get cid(): string {
    return this._call.inputValues[0].value.toString();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SendMailCall__Outputs {
  _call: SendMailCall;

  constructor(call: SendMailCall) {
    this._call = call;
  }
}

export class SendMailToOtherChainCall extends ethereum.Call {
  get inputs(): SendMailToOtherChainCall__Inputs {
    return new SendMailToOtherChainCall__Inputs(this);
  }

  get outputs(): SendMailToOtherChainCall__Outputs {
    return new SendMailToOtherChainCall__Outputs(this);
  }
}

export class SendMailToOtherChainCall__Inputs {
  _call: SendMailToOtherChainCall;

  constructor(call: SendMailToOtherChainCall) {
    this._call = call;
  }

  get _destinationDomain(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _recipient(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get cid(): string {
    return this._call.inputValues[2].value.toString();
  }

  get to(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class SendMailToOtherChainCall__Outputs {
  _call: SendMailToOtherChainCall;

  constructor(call: SendMailToOtherChainCall) {
    this._call = call;
  }
}
