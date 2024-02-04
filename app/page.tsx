"use client";

import { Box, Typography } from "@mui/material";
import PlayerList from "./components/PlayerList";
import players from "@/public/players.json";
import { useLocalStorage } from "./lib/hooks/storage";
import { getCurrentStorageKey } from "./lib/random";
import { Proximity } from "./lib/models/Proximity";
import { RulesModal } from "./components/RulesModal";
import { ResultTable } from "./components/ResultTable";
import { LifeCounter } from "./components/LifeCounter";
import { PlayerCard } from "./components/PlayerCard";

export default function Home() {
  const [store, setStore] = useLocalStorage<Array<Proximity>>(
    getCurrentStorageKey(),
    []
  );

  const guess = async (id: string) => {
    const guessResponse = await fetch("/api/guess", {
      method: "POST",
      headers: { "attemps": store.length.toString() },
      body: JSON.stringify({ id: id }),
    });
    const data: Proximity = await guessResponse.json();
    setStore(() => [...store, data]);
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
