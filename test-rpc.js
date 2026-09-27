const { createPublicClient, http } = require("viem");

const client = createPublicClient({
  chain: {
    id: 91342,
    name: "Ammora Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://sepolia-rpc.giwa.io/"],
      },
    },
  },
  transport: http("https://sepolia-rpc.giwa.io/"),
});

async function main() {
  console.log("Chain ID:", await client.getChainId());

  const code = await client.getBytecode({
    address: "0x15E5C425609AECFCC9AaF7Bb26ca13a3B3341Ac8",
    blockNumber: 0x232ee00n,
  });

  console.log("Contract bytecode:", code ? `${code.slice(0, 20)}...` : "0x");
}

main().catch(console.error);
