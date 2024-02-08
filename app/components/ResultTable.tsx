"use client"

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
} from "@mui/material";
import { CountryProximity, Proximity } from "../lib/models/Proximity";
import { ResultCell } from "./ResultCell";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { calculateAge } from "../lib/compare/age";
import { getCountryByCode } from "../lib/compare/country";

export const ResultTable = (props: { results: Array<Proximity> }) => {
  if (!props?.results?.length) {
    return <></>;
  }
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "500px", margin: "0 10px", overflowX: "scroll" }}>
      <Table size="small" aria-label="simple table" sx={{backgroundColor: "white"}}>
        <TableHead className="t-headers">
          <TableRow>
            <TableCell align="center">Summoner</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">League</TableCell>
            <TableCell align="center">Team</TableCell>
            <TableCell align="center">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.results.map((result) => (
            <TableRow
              key={result.player.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{result.player.summonerName}</TableCell>
              <ResultCell
                value={getCountryByCode(result.player.country)?.name ?? ""}
                validCell={{
                  check: () =>
                    result.compare.country === CountryProximity.VALID,
                  message: "Player's country is correct.",
                }}
                invalidCell={{
                  check: () => result.compare.country === CountryProximity.FAR,
                  message: "Player's country is not correct",
                }}
                partiallyValidCell={{
                  check: () => result.compare.country === CountryProximity.NEAR,
                  message:
                    "Player's country is in the same continent as the anwer's country.",
                }}
              >
                <ReactCountryFlag
                  style={{ fontSize: "2em", lineHeight: "2em" }}
                  countryCode={result.player.country}
                  svg
                />
              </ResultCell>
              <ResultCell
                value={result.player.role}
                validCell={{
                  check: () => result.compare.role === true,
                  message: "Role is correct.",
                }}
                invalidCell={{
                  check: () => result.compare.role === false,
                  message: "Role is incorrect",
                }}
              >
                <Image
                  src={"/assets/role/" + result.player.role + ".webp"}
                  width={32}
                  height={32}
                  alt={result.player.role}
                />
              </ResultCell>
              <ResultCell
                value={result.player.league}
                validCell={{
                  check: () => result.compare.league === true,
                  message: "League is correct.",
                }}
                invalidCell={{
                  check: () => result.compare.league === false,
                  message: "League is incorrect",
                }}
              >
                <Image
                  src={"/assets/league/" + result.player.league + ".png"}
                  alt={result.player.role}
                  width={32}
                  height={32}
                />
              </ResultCell>
              <ResultCell
                value={result.player.team}
                validCell={{
                  check: () => result.compare.team === true,
                  message: "Team is correct.",
                }}
                invalidCell={{
                  check: () => result.compare.team === false,
                  message: "Team is incorrect",
                }}
              >
                <Image
                  src={"/assets/team/" + result.player.team + ".png"}
                  alt={result.player.team}
                  width={32}
                  height={32}
                />
              </ResultCell>
              <ResultCell
                value={new Date(result.player.birthDate)
                  .getFullYear()
                  .toString()}
                validCell={{
                  check: () => result.compare.older === 0,
                  message: "Age is correct.",
                }}
                invalidCell={{
                  check: () => result.compare.older !== 0,
                  message: "Age is incorrect.",
                }}
              >
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  {calculateAge(new Date(result.player.birthDate))}
                  {result.compare.older === 1 ? (
                    <Tooltip
                      title={
                        "Player to guess is older than " +
                        result.player.summonerName
                      }
                    >
                      <NorthEastIcon style={{ fontSize: 16 }} />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                  {result.compare.older === -1 ? (
                    <Tooltip
                      title={
                        "Player to guess is younger than " +
                        result.player.summonerName
                      }
                    >
                      <SouthEastIcon style={{ fontSize: 16 }} />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </div>
              </ResultCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
