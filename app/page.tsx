"use client";

import { Box, Typography } from "@mui/material";
import PlayerList from "@/app/components/PlayerList";
import players from "@/public/players.json";
import { getCurrentStorageKey } from "@/app/lib/random";
import { Proximity } from "@/app/lib/models/Proximity";
import { RulesModal } from "@/app/components/RulesModal";
import { ResultTable } from "@/app/components/ResultTable";
import { LifeCounter } from "@/app/components/LifeCounter";
import { PlayerCard } from "@/app/components/PlayerCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [store, setStore] = useState<Array<Proximity>>([]);

  useEffect(() => {
    // Récupérer les données du localStorage lors du rendu initial du composant
    const storedValue = localStorage.getItem(getCurrentStorageKey());
    if (storedValue) {
      setStore(JSON.parse(storedValue));
    }
  }, []);

  const guess = async (id: string) => {
    const guessResponse = await fetch("/api/guess", {
      method: "POST",
      headers: { "attemps": store.length.toString() },
      body: JSON.stringify({ id: id }),
    });
    const data: Proximity = await guessResponse.json();
    setStore([...store, data]);
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#424242",
        textAlign: "center",
      }}
    >
      <RulesModal />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        marginTop={"10vh"}
      >
        <Typography
          fontSize={35}
          fontWeight={"bold"}
          color={"common.white"}
          component={"h1"}
        >
          LOLESPORTDLE
        </Typography>
        <Typography
          fontSize={15}
          fontWeight={"bold"}
          fontStyle={"italic"}
          color={"common.white"}
          component={"span"}
        >
          Guess the player
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        rowGap={5}
        marginTop={5}
      >
        <LifeCounter lives={store} />
        {store.findLast(r => r.result)?.result ? (
          <PlayerCard player={store.findLast(r => r.result)!.result!} />
        ) : (
          <PlayerList
            elements={players.filter(
              (player) =>
                !store
                  .flatMap((s: Proximity) => s.player?.id)
                  .includes(player.id) && player.birthDate !== "TBD"
            )}
            onPlayerChanges={guess}
            style={{borderRadius: '15px'}}
          />
        )}
        <ResultTable results={store} />
      </Box>
      <footer
        style={{
          width: "100vw",
          position: "fixed",
          bottom: 0,
          textAlign: "center",
          background: "#525252",
        }}
      >
        <div style={{ margin: 5 }}>
          Made with <span style={{ color: "red" }}>&hearts;</span> by{" "}
          <a target="_blank" href="http://github.com/RobinToubi">
            Toubi
          </a>
        </div>
      </footer>
    </main>
  );
}
