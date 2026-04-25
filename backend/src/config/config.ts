import dotenv from "dotenv";

dotenv.config();

export const config = {
  algodServer: process.env.ALGOD_SERVER || "http://localhost",
  algodPort: Number(process.env.ALGOD_PORT || 4001),
  algodToken:
    process.env.ALGOD_TOKEN ||
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  accountMnemonic: process.env.ALGOD_ACCOUNT_MNEMONIC || ""
};