import React, { useEffect, useRef } from "react";
import kaboom from "kaboom";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const MOVE_SPEED = 150;

const Game = () => {
  const canvasRef = useRef(null);

  const { address } = useAccount();

  const { data: life } = useScaffoldContractRead({
    contractName: "EatTheBop",
    functionName: "life",
    args: [address],
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
    value: "0.01",
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
      background: [199, 229, 212],
    });

    k.loadSprite("player-down", "assets/player-down.png");
    k.loadSprite("player-left", "assets/player-left.png");
    k.loadSprite("player-right", "assets/player-right.png");
    k.loadSprite("player-up", "assets/player-up.png");
    k.loadSprite("bopbymhgn", "assets/bop_logo_40x40.png");
    k.loadSprite("wall40x40", "assets/wall40x40.png");

    k.addLevel(
      [
        `  xxx    e    xe x      `,
        `  x   xxxx  x xe x    `,
        `    e x       xx      `,
        `x  x   x   e   xxxx   `,
        `x    xx        xx    x`,
        `x  x  exxxx  xxx  x  x`,
        `x  x   x    e   x xx  `,
        `  xxx            x   x`,
        `  x   xxxx  xxxx x   x`,
        `   e  x               `,
        `  x   x    e  xexx     `,
      ],
      {
        tileWidth: 50,
        tileHeight: 50,
        tiles: {
          x: () => [k.sprite("wall40x40"), k.area(), k.body()],
          e: () => [k.sprite("bopbymhgn"), k.area(), k.body(), "bopbymhgn"],
        },
      },
    );

    const player = k.add([k.sprite("player-down"), k.pos(100, 100), k.area(), k.body(), "player"]);

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
      <h1 className="text-3xl text-center my-5">Find the real BOP to win a 6000 BOP</h1>
      <div className="flex justify-center">
        <div className="mr-5">
          <p className="text-2xl mt-10">Lifes = {life?.toString()}</p>
          <button
            className="py-2 px-4 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => payGame()}
          >
            Add 3 lifes
          </button>
          <p className="text-slate-500">* Cost 0.01 ETH</p>
          <p className="text-xl mt-20">Notes</p>
          <p className="text-slate-500 mb-0">* Some Fake ETH can</p>
          <p className="text-slate-500 mt-0">cause you a life</p>
        </div>
        <div>
          <div className="game">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
