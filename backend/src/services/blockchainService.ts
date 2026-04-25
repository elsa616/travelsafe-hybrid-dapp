import algosdk from "algosdk";
import {
  BlockchainRecordRequest,
  BlockchainRecordResponse
} from "../types/travelSafeTypes";
import { config } from "../config/config";

const algodClient = new algosdk.Algodv2(
  config.algodToken,
  config.algodServer,
  config.algodPort
);

export const recordJourneyOnBlockchain = async (
  payload: BlockchainRecordRequest
): Promise<BlockchainRecordResponse> => {
  if (!config.accountMnemonic) {
    throw new Error("Missing Algorand account mnemonic in backend .env file.");
  }

  const senderAccount = algosdk.mnemonicToSecretKey(config.accountMnemonic);

  const suggestedParams = await algodClient.getTransactionParams().do();

  const notePayload = JSON.stringify({
    city: payload.city,
    weather: payload.weather,
    daylight: payload.daylight,
    travel: payload.travel,
    recordedAt: new Date().toISOString()
  });

  const note = new TextEncoder().encode(notePayload);

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: senderAccount.addr,
    receiver: senderAccount.addr,
    amount: 0,
    suggestedParams,
    note
  });

  const signedTxn = txn.signTxn(senderAccount.sk);
  const sendResult = await algodClient.sendRawTransaction(signedTxn).do();

  await algosdk.waitForConfirmation(algodClient, sendResult.txid, 4);

  return {
    success: true,
    message: `Journey data for ${payload.city} recorded successfully on Algorand localnet.`,
    txId: sendResult.txid,
    recordedAt: new Date().toISOString()
  };
};