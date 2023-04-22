import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Chip } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error';

const SettingsFileMissingDialog = (props) => {

    const exitHandler = () => {
        window.electronApi.exitApp();
    }

    return (
        <Dialog open={props.open} >
            <DialogTitle>
                <Typography variant='h5' sx={{display: "flex"}} >
                    <ErrorIcon color='error' sx={{ marginRight: 1}} fontSize='large'/> Game Settings File Not Found
                </Typography>
                </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    The file <Chip variant="outlined" label="gameSettings.xml" /> was not found in the following path:
                </Typography>
                <Typography gutterBottom textAlign="center">
                    <Chip variant='outlined' label="Documents\My Games\FarmingSimulator2022" />
                    <br /><br />
                </Typography>
                <Typography>
                    Please check that you have Farming Simulator 22 installed on your PC.<br /><br />
                    Also, make sure that you launch the game at least one time, so that the game files 
                    are generated.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color='error' onClick={exitHandler} >Exit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SettingsFileMissingDialog