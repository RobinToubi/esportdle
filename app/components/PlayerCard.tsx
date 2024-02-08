"use client"

import ReactCountryFlag from "react-country-flag";
import { Player } from "../lib/models/Player";
import Image from "next/image";
import { Box } from "@mui/material";

interface PlayerViewProps {
  player: Player;
}

export const PlayerCard = (props: PlayerViewProps) => {
  return (
    <Box
      style={{
        display: "flex",
        backgroundColor: "#aba9a996",
        borderRadius: "7px",
        padding: "2px 10px",
        alignItems: "center",
        columnGap: "10px"
      }}
      width={"100%"} height={100} maxWidth={"400px"}
    >
      <Image src={props.player.picture} width={100} height={100} alt={props.player.summonerName} />
      <ReactCountryFlag
        style={{ fontSize: "1.5em", lineHeight: "1.5em" }}
        countryCode={props.player.country}
        svg
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "10px",
        }}
      >
        <span>
          {props.player.summonerName} ({props.player.role})
        </span>
        <span style={{ fontSize: "0.8em" }}>
          {props.player.firstName} {props.player.lastName}
        </span>
      </div>
    </Box>
  );
};
