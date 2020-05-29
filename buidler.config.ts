import { usePlugin } from "@nomiclabs/buidler/config";
import path from "path";
import fs from "fs";
// @ts-ignore

usePlugin("@nomiclabs/buidler-ethers");
usePlugin("buidler-typechain");
usePlugin("@nomiclabs/buidler-waffle");
usePlugin("@nomiclabs/buidler-etherscan");

["deployments"].forEach((folder) => {
  const tasksPath = path.join(__dirname, "tasks", folder);
  fs.readdirSync(tasksPath).forEach((task) => require(`${tasksPath}/${task}`));
});

const DEFAULT_BLOCK_GAS_LIMIT = 9500000;
const DEFAULT_GAS_PRICE = 10;
const INFURA_KEY = process.env.INFURA_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

const config = {
  solc: {
    version: "0.6.6",
    optimizer: { enabled: false, runs: 200 },
    evmVersion: "istanbul",
  },
  typechain: {
    outDir: "types",
    target: "ethers",
  },
  etherscan: {
    url: "https://api-kovan.etherscan.io/api",
    apiKey: ETHERSCAN_KEY
  },
  defaultNetwork: "buidlerevm",
  mocha: {
    enableTimeouts: false,
  },
  networks: {
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_KEY}`,
      hardfork: "istanbul",
      blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
      gasMultiplier: DEFAULT_GAS_PRICE,
      chainId: 42,
      accounts: [process.env.KOVAN_PK],
    },
  },
};

export default config;
