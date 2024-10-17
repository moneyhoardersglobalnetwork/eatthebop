# 🏗 Eat The BOP
A Hack 2 Earn Project

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

2D commit and reveal game where you eat tokens looking for the real tokens uh` on the level to win and earn BOP.

The Hoarders searches the board for the real BOP token amoung the fake tokens. The hoarder may have obstacles to move before being able to reach certain tokens. Each time a hoarder eats a token they pay a small fee with a random chance of winning a reward paid in BOP tokens.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Typescript, Kaboom, Web3Auth.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

- ✅ **Social Logins**: Now integrated with web3Auth for social login with Google, Emails, Facebook, X formerly Twitter, Discord.

Game currently works when built and hosted locally.

## How to Play

You first need lifes to play Eat The BOP after clicking the play button look for the Buy Lifes button to purchase 6 Lifes

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/1171422a-0ce4-4203-bcd4-d2d1941d198b)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.

Github pushing
Git Hub Staging, Commiting, Pushing //Commands for updating repo on github(Build this out)

//Check remote origin

git remote set-url origin https://github.com/USERNAME/REPOSITORY.git

git remote -v

git add . //adds modified files to commit# mhgn-hoarding-gateway

git commit -m "update from local" // Commit your changes to be pushed to repo

Use the --no-verify option to skip git commit hooks, e.g. git commit -m "commit message" --no-verify . When the --no-verify option is used, the pre-commit and commit-msg hooks are bypassed. Copied! You can also use the -n option, which is short for --no-verify .

git push //push to repo //Push updates to repo (main)

# To Do
Migrate Eat The BOP to Web3Auth to allow social logins
Upgrade Area 1 with new gameplay features:
-Multiple tokens on board (POL,BTC,ETH,LTC,DOT,BNB,CORE)
-Add the abiltiy to buy lifes with USDC with cross-chain transfer ability.
-Add new token and obstacle png files to nextjs/public/assets.
-Test new ways to interact with tokens like different rewards.

Build area 2
-In area 2 Bitcoin has been added as the second token on board.
-The obstacle has been changed to roadblock.png
-Each new area will feature a mix of different tokens and obstacles.