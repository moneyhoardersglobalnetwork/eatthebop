# Eat The BOP

2D game where you eat BOP tokens looking for the real BOP token on the level to win and earn BOP

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

## Contents

- [Requirements](#requirements)
- [Quickstart](#quickstart)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/moneyhoardersglobalnetwork/eat_the_bop.git
cd eatthebop
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

Github pushing
Git Hub Staging, Commiting, Pushing //Commands for updating repo on github(Build this out)

//Check remote origin

git remote set-url origin https://github.com/USERNAME/REPOSITORY.git

git remote -v

git add . //adds modified files to commit# mhgn-hoarding-gateway

git commit -m "update from local" // Commit your changes to be pushed to repo

Use the --no-verify option to skip git commit hooks, e.g. git commit -m "commit message" --no-verify . When the --no-verify option is used, the pre-commit and commit-msg hooks are bypassed. Copied! You can also use the -n option, which is short for --no-verify .

git push //push to repo //Push updates to repo (main)