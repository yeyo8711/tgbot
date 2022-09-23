require("dotenv").config();

const { ethers } = require("ethers");
const CONTRACT_ABI = require("../abi.json");
const IUniswapV3PoolABI =
  require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json").abi;

const rpcURL =
  "https://eth-mainnet.g.alchemy.com/v2/D7IGk-5kMyvwCT2Baxq-aJZy1GTraWWt";
const provider = new ethers.providers.JsonRpcProvider(rpcURL);
const CONTRACT_ADDRESS = "0x34F0915a5f15a66Eba86F6a58bE1A471FB7836A7";
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
const poolAddress = "0x3328ca5b535d537f88715b305375c591cf52d541";
const poolContract = new ethers.Contract(
  poolAddress,
  IUniswapV3PoolABI,
  provider
);

const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "5356958432:AAHLhnLKxgUkikVw9ThFlTxttXb8YddBl08";
const bot = new TelegramBot(TOKEN, { polling: true });
const fromWei = (num) => ethers.utils.formatUnits(num, 12);

const main = async () => {
  contract.on("Transfer", (from, to, value, data) => {
    if (
      from == "0x3328CA5b535D537F88715b305375C591cF52d541" ||
      from == "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39" ||
      from == "0x2ce2baa46ae7352584bb87a4e1908a1fd8590dec" ||
      from == "0x3311bf503b5cd93fdb37776cb22dd47b75bf5a28"
    ) {
      bot.sendMessage(
        1221518706,
        `🚀${to.slice(0, 10)} BOUGHT  ${Number(fromWei(value)).toFixed(
          2
        )} PLSD 🐕`
      );
      console.log(data);
    } else if (
      to == "0x3328CA5b535D537F88715b305375C591cF52d541" ||
      to == "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39" ||
      to == "0x2ce2baa46ae7352584bb87a4e1908a1fd8590dec" ||
      to == "0x3311bf503b5cd93fdb37776cb22dd47b75bf5a28"
    ) {
      bot.sendMessage(
        1221518706,
        `🔻${to.slice(0, 10)} SOLD  ${Number(fromWei(value)).toFixed(
          2
        )} PLSD 🐕`
      );
    }
  });
  contract.on("Claim", (to, amount) => {
    bot.sendMessage(
      1221518706,
      `${to.slice(0, 10)} has CLAIMED ${fromWei(amount)} PLSD 🐕`
    );
  });
};

main();
