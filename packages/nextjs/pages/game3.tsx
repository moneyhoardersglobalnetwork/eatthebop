import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import Game3 from "~~/components/Game3";

const GameArea3: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Eat The BOP</title>
        <meta
          name="description"
          content="A M.H.G.N dApp Created with 🏗 scaffold-eth-2. The goal is to find the real BOP token on the board. "
        />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div>
        <Game3 />
      </div>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Area 3</h1>
        <p className="text-neutral">
          Once you're done here.
          <br /> Check out{" "}
          <code className="italic bg-base-300 text-base font-bold  px-1">
            new areas to search
          </code>{" "}
        </p>
      </div>
      </div>
  );
};

export default GameArea3;
