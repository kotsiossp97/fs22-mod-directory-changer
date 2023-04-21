import { AppBar, Box, Button, ButtonGroup, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import FSIcon from './FSIcon'
import DarkModeSwitch from './DarkModeSwitch'
import MenuIcon from '@mui/icons-material/Menu';
import { Close, CropSquare, Minimize } from '@mui/icons-material'
import EditDirectoriesDialog from './EditDirectoriesDialog';

const TopBar = (props) => {
    const [menuAnchor, setMenuAnchor] = useState(null)
    const [editDirsOpen, setEditDirsOpen] = useState(false)

    const menuOpen = Boolean(menuAnchor)

    const handleMenuClick = (e)=>{
        setMenuAnchor(e.currentTarget)
      }
    
    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleEditDirs = () => {
        handleMenuClose()
        setEditDirsOpen(true)
    }

    const handleMinimize = () => {
        window.electronApi.minimize()
    }

    const handleMaximize = () => {
        window.electronApi.maximize()
    }

    const handleAppExit = () => {
        window.electronApi.exitApp()
    }
    
    const handleEditDirsClose = () => {
        setEditDirsOpen(false)
    }

    return (
        <Box sx={{ flexGrow: 1 }} >
          <AppBar position="static"  style={{ WebkitAppRegion: "drag"}} >
            <Toolbar sx={{marginRight: 15}}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenuClick}
                style={{WebkitAppRegion: "no-drag"}}
              >
                <MenuIcon />
              </IconButton>
              <Menu open={menuOpen} anchorEl={menuAnchor} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditDirs}>Edit Directories</MenuItem>
              </Menu>
              <FSIcon />
              <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1, letterSpacing: '.2rem' }}>FS22 Mod Directory Changer</Typography>
              <DarkModeSwitch handler={props.darkThemeHandler} style={{WebkitAppRegion: "no-drag"}}/>

              <Box position="fixed" top={0} right={0} style={{WebkitAppRegion: "no-drag"}}>
                <ButtonGroup variant="text"  size="small">
                  <Button onClick={handleMinimize} color="secondary"><Minimize /></Button>
                  <Button onClick={handleMaximize} color="secondary"><CropSquare /></Button>
                  <Button onClick={handleAppExit} color="error"><Close /></Button>
                </ButtonGroup>
              </Box>
            </Toolbar>

          </AppBar>
          <EditDirectoriesDialog open={editDirsOpen} closeHandler={handleEditDirsClose} />
        </Box>
    )
}

export default TopBar