import { Button, Card, CardActions, CardContent, CardHeader, Container, MenuItem, Select, Typography } from "@mui/material"

import { useEffect, useState } from "react"
import { getDirectories } from "../Global/DirectoryFunctions"

const ChangeDirectoryCard = (props) => {
    const [newDir, setNewDir] = useState("default")
    const [directories, setDirectories] = useState([])
    const handleDirSelChg = (e) => {
        setNewDir(e.target.value)
    }

    const handleChangeDirectory = () => {
        window.electronApi.changeDirectory(newDir)
        props.refresh()
    }

    useEffect(()=>{
      getDirectories().then((directories)=>{
        setDirectories(directories)
      })
    }, [directories])


    return (
        <Container maxWidth="md" sx={{ paddingTop: 5}}>
          <Card variant="outlined">
            <CardHeader title="Change Current Directory" />
            <CardContent>
              <Select value={newDir} onChange={handleDirSelChg}>
                {directories.map( dir => (
                  <MenuItem value={dir.path} key={dir.name}>{dir.name}</MenuItem>
                ))}
              </Select>
              <Typography variant="caption" display="block" sx={{color: "text.disabled"}}>You can edit the available directories from the menu above.</Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" color="success" onClick={handleChangeDirectory}>Save Changes</Button>
            </CardActions>
          </Card>
        </Container>
    )
}

export default ChangeDirectoryCard