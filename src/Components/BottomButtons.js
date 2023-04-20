import { Button, ButtonGroup, Container } from '@mui/material'
import React from 'react'

const BottomButtons = (props) => {
    const handleToggleOverride = props.overrideHandler

    const handleAppExit = () => {
        window.electronApi.exitApp()
    }

    const handleLaunchFS = () => {
        window.electronApi.launchFS()
    }

    return (
        <Container maxWidth="md" sx={{ paddingTop: 5}}>
        <ButtonGroup size="large" fullWidth>
          <Button variant="outlined" color="secondary" onClick={handleToggleOverride}>Toggle Override</Button>
          <Button variant="outlined" onClick={handleLaunchFS}>Launch FS22</Button>
          <Button variant="outlined" color="error" onClick={handleAppExit}>Exit</Button>
        </ButtonGroup>
      </Container>
    )
}

export default BottomButtons