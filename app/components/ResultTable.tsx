'use client'

import { Collapse, Grid } from '@mui/material'
import { CountryProximity, Proximity } from '../lib/models/Proximity'
import { ResultCell } from './ResultCell'
import ReactCountryFlag from 'react-country-flag'
import Image from 'next/image'
import { getCountryByCode } from '../lib/compare/country'
import { TransitionGroup } from 'react-transition-group'
import { AgeResultCell } from './AgeResultCell'

export const ResultTable = (props: { results: Array<Proximity> }) => {
    if (!props?.results?.length) {
        return <></>
    }
    return (
        <>
            <Grid
                container
                direction={'column'}
                spacing={2}
                aria-label="Result table"
                sx={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    color: 'black',
                    fontSize: '0.75em',
                    borderRadius: '5px',
                    maxWidth: '500px',
                    marginX: '1%',
                    justifyItems: 'center',
                    marginY: '10px',
                }}
            >
                <Grid container sx={{ paddingY: 1 }}>
                    <Grid item xs={3} md={2} textOverflow={'ellipsis'}>
                        Name
                    </Grid>
                    <Grid item xs={2} md={2}>
                        Country
                    </Grid>
                    <Grid item xs={2} md={2}>
                        Role
                    </Grid>
                    <Grid item xs={2} md={2}>
                        League
                    </Grid>
                    <Grid item xs={2} md={2}>
                        Team
                    </Grid>
                    <Grid item xs={1} md={2}>
                        Age
                    </Grid>
                </Grid>
                <TransitionGroup
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyItems: 'center',
                    }}
                >
                    {props.results.map((result) => (
                        <Collapse key={result.player.id}>
                            <Grid
                                key={result.player.id}
                                container
                                lineHeight={'2.5em'}
                                justifyItems={'center'}
                                alignItems={'center'}
                            >
                                <Grid item xs={3} md={2}>
                                    {result.player.summonerName}
                                </Grid>
                                <ResultCell
                                    value={
                                        getCountryByCode(result.player.country)
                                            ?.name ?? ''
                                    }
                                    validCell={{
                                        check: () =>
                                            result.compare.country ===
                                            CountryProximity.VALID,
                                        message: `${result.player.summonerName} comes from the same country as the country of the player to guess`,
                                    }}
                                    invalidCell={{
                                        check: () =>
                                            result.compare.country ===
                                            CountryProximity.FAR,
                                        message: `${result.player.summonerName} does not come from the same country as the country of the player to guess`,
                                    }}
                                    partiallyValidCell={{
                                        check: () =>
                                            result.compare.country ===
                                            CountryProximity.NEAR,
                                        message: `${result.player.summonerName} comes from a country on the same continent as the country of the player being guessed`,
                                    }}
                                >
                                    <ReactCountryFlag
                                        style={{
                                            fontSize: '2em',
                                        }}
                                        countryCode={result.player.country}
                                        svg
                                    />
                                </ResultCell>
                                <ResultCell
                                    value={result.player.role}
                                    validCell={{
                                        check: () =>
                                            result.compare.role === true,
                                        message: 'Role is correct.',
                                    }}
                                    invalidCell={{
                                        check: () =>
                                            result.compare.role === false,
                                        message: 'Role is incorrect',
                                    }}
                                >
                                    <Image
                                        src={
                                            '/assets/role/' +
                                            result.player.role +
                                            '.webp'
                                        }
                                        width={32}
                                        height={32}
                                        alt={result.player.role}
                                    />
                                </ResultCell>
                                <ResultCell
                                    value={result.player.league}
                                    validCell={{
                                        check: () =>
                                            result.compare.league === true,
                                        message: 'League is correct.',
                                    }}
                                    invalidCell={{
                                        check: () =>
                                            result.compare.league === false,
                                        message: 'League is incorrect',
                                    }}
                                >
                                    <Image
                                        src={
                                            '/assets/league/' +
                                            result.player.league +
                                            '.png'
                                        }
                                        alt={result.player.role}
                                        width={32}
                                        height={32}
                                    />
                                </ResultCell>
                                <ResultCell
                                    value={result.player.team}
                                    validCell={{
                                        check: () =>
                                            result.compare.team === true,
                                        message: 'Team is correct.',
                                    }}
                                    invalidCell={{
                                        check: () =>
                                            result.compare.team === false,
                                        message: 'Team is incorrect',
                                    }}
                                >
                                    <Image
                                        src={
                                            '/assets/team/' +
                                            result.player.team +
                                            '.png'
                                        }
                                        alt={result.player.team}
                                        width={32}
                                        height={32}
                                    />
                                </ResultCell>
                                <AgeResultCell
                                    older={result.compare.older}
                                    summonerName={result.player.summonerName}
                                    birthDate={result.player.birthDate}
                                />
                            </Grid>
                        </Collapse>
                    ))}
                </TransitionGroup>
            </Grid>
        </>
    )
}
