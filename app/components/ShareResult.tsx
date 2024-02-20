import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import { Compare } from '../lib/models/Compare'
import { Share } from '@mui/icons-material'
import { CountryProximity } from '../lib/models/Proximity'
import { DateTime } from 'luxon'
import { getDateAtMidnight } from '../lib/random'

const ShareResultButton = (props: { results: Array<Compare> }) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(dataFromCompare())
    }

    const dataFromCompare = () => {
        let dataResult = `ESPORTDLE - ${getDateAtMidnight().toFormat(
            'yyyy LLL dd'
        )}\n`
        props.results.forEach((c) => (dataResult += getResultLine(c) + '\n'))
        return dataResult
    }

    const getResultLine = (compare: Compare) => {
        let r = ''
        if (compare.country === CountryProximity.FAR) r += '🟥 '
        if (compare.country === CountryProximity.NEAR) r += '🟨 '
        if (compare.country === CountryProximity.VALID) r += '🟩 '

        r += compare.role ? '🟩 ' : '🟥 '
        r += compare.league ? '🟩 ' : '🟥 '
        r += compare.team ? '🟩 ' : '🟥 '
        r += compare.older === 0 ? '🟩' : '🟥'
        return r
    }

    return (
        <>
            <Button
                onClick={handleClick}
                variant="contained"
                color={'primary'}
                sx={{
                    backgroundColor: 'grey',
                    ':hover': {
                        color: 'grey',
                        backgroundColor: 'white',
                    },
                }}
            >
                <Share sx={{ marginRight: 1 }} />
                Share result
            </Button>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Result copied to clipboard"
            />
        </>
    )
}

export default ShareResultButton
