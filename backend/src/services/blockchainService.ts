import {
  BlockchainRecordRequest,
  BlockchainRecordResponse
} from "../types/travelSafeTypes";

export const recordJourneyOnBlockchain = async (
  payload: BlockchainRecordRequest
): Promise<BlockchainRecordResponse> => {
  const fakeTransactionId = `TX-${Date.now()}-${payload.city.toUpperCase()}`;

  return {
    success: true,
    message: `Journey data for ${payload.city} recorded successfully.`,
    txId: fakeTransactionId,
    recordedAt: new Date().toISOString()
  };
};