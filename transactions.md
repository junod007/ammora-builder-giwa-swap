# Transaction Evidence

## Network

- GIWA Sepolia
- Chain ID: `91342`
- RPC: `https://sepolia-rpc.giwa.io`

## 1. Wrap

- From: native ETH
- To: WETH
- Amount: `0.0015 ETH`
- WETH: `0x4200000000000000000000000000000000000006`
- Status: `success`
- Tx: `0xa034a194aae6b5b0008bfc06369a729299e1da065491f069799bc172dfcd3136`

## 2. Approval

- Token: WETH
- Amount: `0.001 WETH`
- Spender/pool: `0x253c3e5519ed19a1b0eda86ce7676fa973157830`
- Independently verified allowance: `0.001 WETH`
- Status: `success`

## 3. Quote

- Input: `0.001 WETH`
- Output token: AUICMP
- AUICMP decimals: `9`
- Fresh quote: `70,934.632859901 AUICMP`
- Slippage: `0.5%`
- Minimum output: `70,579.959695601 AUICMP`

## 4. Simulation

Method:

`swapExactIn`

Result:

`PASS`

No transaction was sent during simulation.

## 5. Swap execution

- Pool: `0x253c3e5519ed19a1b0eda86ce7676fa973157830`
- Recipient: `0xA128a89295926939B3CB161e8990E74f4D365093`
- Input: `0.001 WETH`
- Status: `success`
- Tx: `0x6c81da88e0537cfc81c8f0c334afd6d37de99c1b43866db771f621b81d10f9b1`

## 6. Output verification

Token:

`AUICMP`

Contract:

`0xd034c409aa90d396d987d6718e723b4962852ac6`

Decimals:

`9`

Verified wallet balance:

`70,934.632859901 AUICMP`

Raw balance:

`70934632859901`
