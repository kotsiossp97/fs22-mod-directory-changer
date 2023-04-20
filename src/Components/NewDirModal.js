import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const NewDirModal = (props) => {
    const [newName, setNewName] = useState("")
    const [newPath, setNewPath] = useState("")
    const [isValid, setIsValid] = useState(false)

    const selectPath = (e) => {
        window.electronApi.folderDialog().then( (path)=>{
            setNewPath(path[0])
        })
    }


    const handleNameChange = (e)=>{
        const val = e.target.value
        setNewName(val)
    }

    useEffect(()=>{
        if(newPath.length > 3 && newName.length > 3){
            setIsValid(true)
        }
        else{
            setIsValid(false)
        }
    }, [newPath, newName])


    const handleSave = () => {
        const obj = {
            name: newName,
            path: newPath
        }

        props.saveHandler(obj)
    }


  return (
    <Dialog open={props.open} onClose={props.closeHandler} maxWidth="sm" fullWidth>
        <DialogTitle>New Directory</DialogTitle>
        <DialogContent>
            <Stack gap={5} paddingTop={2}>
                <TextField label="Name" name='Name' value={newName} onChange={handleNameChange}/>
                <TextField label="Path" name='Path' onClick={selectPath} value={newPath} sx={{}} InputProps={{readOnly: true,}}/>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' color='error' onClick={props.closeHandler}>Cancel</Button>
            <Button variant='outlined' disabled={!isValid} onClick={handleSave}>Save</Button>
        </DialogActions>
    </Dialog>
  )
}

export default NewDirModal