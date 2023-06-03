import {
  Approval as ApprovalEvent,
  LogNote as LogNoteEvent,
  Transfer as TransferEvent,
} from "../generated/dai/dai";
import { daiApproval, LogNote, daiTransfer } from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new daiApproval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.src = event.params.src;
  entity.guy = event.params.guy;
  entity.wad = event.params.wad;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleLogNote(event: LogNoteEvent): void {
  let entity = new LogNote(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sig = event.params.sig;
  entity.usr = event.params.usr;
  entity.arg1 = event.params.arg1;
  entity.arg2 = event.params.arg2;
  entity.data = event.params.data;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new daiTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.src = event.params.src;
  entity.dst = event.params.dst;
  entity.wad = event.params.wad;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
