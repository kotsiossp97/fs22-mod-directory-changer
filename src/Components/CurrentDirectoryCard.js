import { Button, Card, CardActions, CardContent, CardHeader, Container, Typography } from '@mui/material'
import { getDirectories } from '../Global/DirectoryFunctions'
import { useEffect, useState } from 'react'

const CurrentDirectoryCard = (props) => {
    const currentDir = props.currentDir
    const isActiveOverride = props.isActiveOverride
    const [directories, setDirectories] = useState([])

    useEffect(()=>{
      getDirectories().then((directories)=>{
        setDirectories(directories)
      })
    }, [directories])

    const currentDirStr = ()=>{
        if(isActiveOverride){
          if(currentDir === "" || currentDir === " "){
            return directories[0].name
          }
          else{
            const dir = directories.filter(dir => dir.path === currentDir)[0]

            if(!dir){
              return currentDir
            }
            return dir.name
          }
        }
        else{
          return "Directory Override is disabled!"
        }
    }

    const handleOpenDir = () => {
        window.electronApi.openPath(currentDir)
    }

    return (
        <Container maxWidth="md" sx={{ paddingTop: 5}}>
          <Card variant="outlined">
            <CardHeader title="Current Mod Directory" />
            <CardContent>
              <Typography variant="h5"> {currentDirStr()} </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={handleOpenDir}>Open Folder</Button>
            </CardActions>
          </Card>
        </Container>
    )
}

export default CurrentDirectoryCard