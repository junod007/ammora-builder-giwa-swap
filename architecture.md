# Ammora Builder Architecture

## Current prototype

```text
Browser
  │
  ├── wrap.html
  │     └── WETH.deposit()
  │
  ├── approve.html
  │     └── WETH.approve(pool, 0.001 WETH)
  │
  └── swap.html
        ├── quoteExactInDetailed()
        ├── simulateContract(swapExactIn)
        └── walletClient.writeContract(swapExactIn)
                    │
                    ▼
             GIWA Sepolia
                    │
                    ▼
          Ammora Compounding Pool
                    │
                    ▼
                 AUICMP
```

## Design principles demonstrated

### Read before write

Balances, quote, allowance, and block data were read before execution.

### Exact approval

The pool received an allowance for exactly `0.001 WETH`, rather than an unlimited ERC-20 approval.

### Simulation before execution

`simulateContract()` was used immediately before the real transaction.

### Post-transaction verification

The output token balance was read directly from the AUICMP contract after the receipt succeeded.

## Refactor target

Move from separate HTML prototypes to:

```text
ammora-builder/
├── src/
│   ├── main.ts
│   ├── config.ts
│   ├── ammora.ts
│   ├── wallet.ts
│   └── ui.ts
├── public/
├── docs/
│   ├── transactions.md
│   └── architecture.md
├── README.md
├── package.json
└── tsconfig.json
```

The three prototype pages can remain as historical proof-of-concept files until the TypeScript version reproduces the same on-chain result.
