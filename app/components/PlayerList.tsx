'use client'

import { Autocomplete, TextField } from '@mui/material'
import { CSSProperties, useState } from 'react'
import { Player } from '../lib/models/Player'

export interface IListProps {
    elements: Array<Player>
    onPlayerChanges: Function
    style?: CSSProperties
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('@/public/players.json')
    const players = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            players: players,
        },
    }
}

export default function PlayerList(props: IListProps) {
    const onPlayerSelect = (event: any, value: any) => {
        event.preventDefault()
        if (value?.id) {
            props.onPlayerChanges(value.id)
        }
        setSelectedId({ id: '', label: '' })
    }

    const [selectedId, setSelectedId] = useState({ id: '', label: '' })

    return (
        <Autocomplete
            renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{ background: 'white', borderRadius: 5 }}
                    style={props.style}
                    placeholder="Summoner ... "
                    InputProps={{
                        ...params.InputProps,
                        sx: { borderRadius: '15px' },
                        type: 'search',
                    }}
                ></TextField>
            )}
            style={{
                borderRadius: 5,
                width: '100%',
                maxWidth: 500,
                padding: '0 10px',
            }}
            options={props.elements.map((value) => {
                return {
                    id: value.id,
                    label: `${value.summonerName} - ${value.firstName} ${value.lastName}`,
                }
            })}
            forcePopupIcon={false}
            disableClearable={true}
            isOptionEqualToValue={(option, value) =>
                option.id === value.id && option.label === value.label
            }
            onChange={(event, value) => onPlayerSelect(event, value)}
            sx={{ width: 500 }}
            value={selectedId}
        />
    )
}
