import { useState, useEffect, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Paper, Button } from '@common/components'

const GameFeedbackBox = () =>
{
    return (
        <Grid container direction="row" alignItems="center" justifyContent="center">
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Button variant="contained" color="primary">
                    {'Abschließen'}
                </Button>
            </Paper>
        </Grid>
    )
}

export default memo(GameFeedbackBox)