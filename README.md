# Ammora Builder — GIWA Sepolia Swap

A hands-on Ammora integration built on **GIWA Sepolia (Chain ID 91342)**.

This project documents a real end-to-end testnet swap using MetaMask, WETH, an Ammora compounding pool, viem, and the Ammora SDK ecosystem.

## What was completed

- Connected MetaMask to GIWA Sepolia
- Read the wallet's native ETH balance
- Wrapped native ETH into WETH
- Read and verified WETH balance
- Read an Ammora pool's exact-input quote
- Approved exactly `0.001 WETH` to the pool
- Verified the ERC-20 allowance on-chain
- Calculated 0.5% slippage protection
- Simulated `swapExactIn` successfully with `eth_call`
- Executed `swapExactIn` through MetaMask
- Verified the resulting AUICMP balance directly from the token contract

## Network

| Item | Value |
|---|---|
| Network | GIWA Sepolia |
| Chain ID | `91342` |
| RPC | `https://sepolia-rpc.giwa.io` |
| Explorer | `https://sepolia-explorer.giwa.io` |
| Native token | ETH |

## Main contracts used

| Contract | Address |
|---|---|
| WETH | `0x4200000000000000000000000000000000000006` |
| Ammora pool | `0x253c3e5519ed19a1b0eda86ce7676fa973157830` |
| AUICMP | `0xd034c409aa90d396d987d6718e723b4962852ac6` |
| Wallet | `0xA128a89295926939B3CB161e8990E74f4D365093` |

## Swap result

Input:

`0.001 WETH`

Fresh quote:

`70,934.632859901 AUICMP`

Slippage protection:

`0.5%`

Minimum output:

`70,579.959695601 AUICMP`

Simulation:

`PASS`

Execution:

`SUCCESS`

Verified final AUICMP balance:

`70,934.632859901 AUICMP`

## Transaction evidence

### Wrap ETH → WETH

`0.0015 ETH → 0.0015 WETH`

Transaction:

`0xa034a194aae6b5b0008bfc06369a729299e1da065491f069799bc172dfcd3136`

### WETH approval

Approved:

`0.001 WETH`

Spender:

`0x253c3e5519ed19a1b0eda86ce7676fa973157830`

The allowance was independently re-read from the WETH contract and verified as:

`0.001 WETH`

### Swap

Transaction:

`0x6c81da88e0537cfc81c8f0c334afd6d37de99c1b43866db771f621b81d10f9b1`

Result:

`0.001 WETH → 70,934.632859901 AUICMP`

## Architecture

```text
MetaMask
   │
   ▼
Local Vite/HTML dApp
   │
   ├── viem Wallet Client
   ├── viem Public Client
   │
   ▼
GIWA Sepolia RPC
   │
   ▼
Ammora Compounding Pool
   │
   ├── quoteExactInDetailed()
   └── swapExactIn()
   │
   ▼
AUICMP
```

## Safety-first execution flow

The swap was not sent blindly.

```text
Read balances
    ↓
Wrap ETH → WETH
    ↓
Read WETH balance
    ↓
Read fresh quote
    ↓
Approve exact amount
    ↓
Verify allowance
    ↓
Refresh quote
    ↓
Calculate 0.5% minimum output
    ↓
simulateContract()
    ↓
Simulation PASS
    ↓
MetaMask confirmation
    ↓
On-chain receipt SUCCESS
    ↓
Read AUICMP balance
```

## Project files

The local prototype currently uses:

- `wrap.html` — native ETH → WETH
- `approve.html` — exact WETH allowance
- `swap.html` — quote, simulation, and execution

These files are intentionally simple while the integration is being validated. The next cleanup step is to consolidate the flow into a proper Vite + TypeScript application and keep the transaction evidence in `docs/`.

## Notes

This is a **GIWA Sepolia testnet experiment**. Values and contracts are testnet-specific and should not be treated as mainnet deployment configuration.

The pool used in this experiment was identified through Ammora's GIWA data/API flow and exposed as an active `ARLORA_COMPOUNDING_V3` pool. The SDK's route-discovery path encountered RPC verification timeouts during historical `eth_getCode` reads, so the final proof-of-concept used the pool's verified on-chain ABI methods directly with viem.

## Next builder step

Refactor the prototype into a clean TypeScript app with:

1. Wallet connection
2. Token balances
3. Pool/quote discovery
4. Slippage controls
5. Simulation
6. Transaction execution
7. Transaction/result history
8. Clear error handling
9. README screenshots and transaction evidence

