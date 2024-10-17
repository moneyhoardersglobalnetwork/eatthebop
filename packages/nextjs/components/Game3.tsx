import React, { useEffect, useRef } from "react";
import Link from "next/link";
import kaboom from "kaboom";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const MOVE_SPEED = 150;

const Game3 = () => {
  const canvasRef = useRef(null);

  const { address } = useAccount();

  const { data: life } = useScaffoldContractRead({
    contractName: "EatTheBop",
    functionName: "life",
    args: [address],
  });

  const { data: stats } = useScaffoldContractRead({
    contractName: "EatTheBop",
    functionName: "hoarders",
    args: [address],
  });

  const { data: lastNumber } = useScaffoldContractRead({
    contractName: "EatTheBop",
    functionName: "getNums",
  });

  const { data: canPlay } = useScaffoldContractRead({
    contractName: "EatTheBop",
    functionName: "canPlay",
  });

  useScaffoldEventSubscriber({
    contractName: "EatTheBop",
    eventName: "Result",
    listener: (player: any, num: any, isWinner) => {
      console.log(player, num, isWinner);
      if (isWinner) notification.success(`${num}: You Won`);
      else if (num === 5) notification.error(`${num}: You Lose Life`);
      else notification.info(`${num}: Nothing`);
    },
  });

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "EatTheBop",
    functionName: "earnPoint",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: payGame } = useScaffoldContractWrite({
    contractName: "EatTheBop",
    functionName: "playGame",
    value: "10000000000000000",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  useEffect(() => {
    if (life) {
      startGame();
    }
  }, [canPlay]);

  const startGame = () => {
    const k = kaboom({
      global: false,
      canvas: canvasRef.current,
      background: [200, 200, 450],
    });

    k.loadSprite("player-down", "assets/player-down.png");
    k.loadSprite("player-left", "assets/player-left.png");
    k.loadSprite("player-right", "assets/player-right.png");
    k.loadSprite("player-up", "assets/player-up.png");
    k.loadSprite("bopbymhgn", "assets/bop_logo_40x40.png");
    k.loadSprite("eth", "assets/ethereum.png");
    k.loadSprite("traffic-cone", "assets/traffic-cone.png");
    

    k.addLevel(
      [
        `  xx p x xex xex`,
        `  xx   x   e x p`,
        `  xxe  x   x   x`,
        `  xx   x  xxxxpx`,
        `  xx xxxxp x   x`,
        ` e     xe  x    `,
        `    e          e`,
        `p  xx  x        `,
        ` x     x  p xpx `,
        `ex x   x        `,
        `xxxx p xex xexxp`,
      ],
      {
        tileWidth: 50,
        tileHeight: 50,
        tiles: {
          x: () => [k.sprite("traffic-cone"), k.area(), k.body()],
          e: () => [k.sprite("bopbymhgn"), k.area(), k.body(), "bopbymhgn"],
          p: () => [k.sprite("eth"), k.area(), k.body(), "bopbymhgn"],
        },
      },
    );

    const player = k.add([k.sprite("player-down"), k.pos(5, 5), k.area(), k.body(), "player"]);
    

    k.onKeyDown("left", () => {
      player.use(k.sprite("player-left"));
      player.move(-MOVE_SPEED, 0);
    });
    k.onKeyDown("right", () => {
      player.use(k.sprite("player-right"));
      player.move(MOVE_SPEED, 0);
    });
    k.onKeyDown("up", () => {
      player.use(k.sprite("player-up"));
      player.move(0, -MOVE_SPEED);
    });
    k.onKeyDown("down", () => {
      player.use(k.sprite("player-down"));
      player.move(0, MOVE_SPEED);
    });

    player.onCollide("bopbymhgn", bopbymhgn => {
      k.destroy(bopbymhgn);
      writeAsync();
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-center my-5">Find the real tokens to win 6 or 6000 in BOP rewards</h1>
      <p className="text-2xl text-center mt-10">Last Eats = {lastNumber?.toString()}</p>
      <p className="text-2xl mt-10">Your rewards/wins = {stats?.toString()}</p>
      <div className="flex justify-center">
        <div className="mr-5">
          <p className="text-2xl mt-10">Lifes = {life?.toString()}</p>
          <button
            className="py-2 px-4 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => payGame()}
          >
            Buy 6 lifes
          </button>
          <p className="text-white">* Cost 0.01 POL</p>
          <p className="text-xl mt-5">Notes</p>
          <p className="text-white mt-1">*Eating fake tokens can cost you a life</p>
          <p className="text-white mt-1">*Ctrl-r to reset board</p>
          <p className="text-white mt-0">*You pay gas fees for every token eaten</p>
          <p className="text-white mt-0"></p>
          <div className="center">
            <Link
              href="/example-ui"
              passHref
              className=" py-2 px-16 mb-1 mt-3 bg-black rounded baseline hover:bg-warning disabled:opacity-50"
            >
              Next Area
            </Link>
          </div>
        </div>
        <div>
          <div className="game3">
            <canvas ref={canvasRef} height={550} width={800}></canvas>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Game3;
