'use client'

import ReactCountryFlag from 'react-country-flag'
import { Player } from '../lib/models/Player'
import Image from 'next/image'
import { Box } from '@mui/material'

interface PlayerViewProps {
    player: Player
}

export const PlayerCard = (props: PlayerViewProps) => {
    return (
        <Box
            style={{
                display: 'flex',
                backgroundColor: '#aba9a996',
                borderRadius: '7px',
                padding: '2px 10px',
                alignItems: 'center',
            }}
            width={'100%'}
            height={100}
            maxWidth={'400px'}
        >
            <Image
                src={props.player.picture}
                width={100}
                height={100}
                style={{ height: 'auto', borderRadius: '50%' }}
                alt={props.player.summonerName}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexGrow: 1,
                }}
            >
                <p>{props.player.summonerName}</p>
                <p style={{ fontSize: '0.8em' }}>
                    {props.player.firstName} {props.player.lastName}
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        margin: '5px 0',
                    }}
                >
                    <ReactCountryFlag
                        style={{ fontSize: '1.5em', lineHeight: '1.5em' }}
                        countryCode={props.player.country}
                        svg
                    />
                    <Image
                        src={'/assets/role/' + props.player.role + '.webp'}
                        width={32}
                        height={32}
                        alt={props.player.role}
                    />
                    <Image
                        src={'/assets/team/' + props.player.team + '.png'}
                        alt={props.player.team}
                        width={32}
                        height={32}
                    />{' '}
                    <Image
                        src={'/assets/league/' + props.player.league + '.png'}
                        alt={props.player.role}
                        width={32}
                        height={32}
                    />
                </div>
            </div>
        </Box>
    )
}
