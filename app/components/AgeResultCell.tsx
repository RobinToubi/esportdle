import { Box } from '@mui/material'
import { calculateAge } from '../lib/compare/age'
import { ResultCell } from './ResultCell'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import SouthEastIcon from '@mui/icons-material/SouthEast'

export interface AgeResultCellProps {
    older: number
    birthDate: string
    summonerName: string
}

export const AgeResultCell = (props: AgeResultCellProps) => {
    const getAgeMessage = () => {
        if (props.older === 1)
            return `Player to guess is older than ${props.summonerName}`
        if (props.older === -1)
            return `Player to guess is younger than ${props.summonerName}`
        return `Player to guess has the same age as ${props.summonerName}`
    }

    return (
        <ResultCell
            xs={1}
            value={new Date(props.birthDate).getFullYear().toString()}
            validCell={{
                check: () => props.older === 0,
                message: getAgeMessage(),
            }}
            invalidCell={{
                check: () => props.older !== 0,
                message: getAgeMessage(),
            }}
        >
            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                }}
            >
                {calculateAge(new Date(props.birthDate))}
                {props.older === 1 ? (
                    <NorthEastIcon style={{ fontSize: 16 }} />
                ) : (
                    ''
                )}
                {props.older === -1 ? (
                    <SouthEastIcon style={{ fontSize: 16 }} />
                ) : (
                    ''
                )}
            </Box>
        </ResultCell>
    )
}
