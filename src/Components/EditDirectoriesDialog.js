import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import MaterialReactTable from 'material-react-table';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NewDirModal from './NewDirModal';
import { Delete, Edit } from '@mui/icons-material';
import { getDirectories } from '../Global/DirectoryFunctions';



const EditDirectoriesDialog = (props) => {
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [Directories, setDirectories] = useState([])
    const [tableData, setTableData] = useState([])
    const columns = useMemo(()=>(
        [
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: "path",
                header: "Path"
            }
        ]
    ), [])

    useEffect(()=>{
        getDirectories().then((directories)=>{
            setDirectories(directories)
            setTableData(Directories.slice(1,Directories.length))
        })
    },[props.open])
    
    const defaultDirObj = Directories[0]
    
    const handleCreateModalOpen = () => {
        setCreateModalOpen(true)
    }
    
    const handleCreateModalClose = () => {
        setCreateModalOpen(false)
    }

    const handleSaveNewDir = (data) => {
        console.log(data)
        setTableData((prev)=> [...prev, data] )
        handleCreateModalClose()
    }

    const handleSaveRowEdits = ({ exitEditingMode, row, values }) => {
        tableData[row.index] = values;
        setTableData([...tableData]);
        exitEditingMode();
    }

    const handleDeleteRow = (row) => {
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
    } 

    const handleSaveAll = ()=>{

        const newDirs = JSON.stringify([defaultDirObj, ...tableData])
        window.electronApi.writeDirectories(newDirs)

        props.closeHandler()
    }
    

    return (
        <Dialog open={props.open} onClose={props.closeHandler} fullWidth maxWidth="sm">
            <NewDirModal open={createModalOpen} closeHandler={handleCreateModalClose} saveHandler={handleSaveNewDir}/>
            <DialogTitle>Edit Directories</DialogTitle>
            <DialogContent>

                <MaterialReactTable 
                    columns={columns} 
                    data={tableData}
                    enableEditing={true}
                    editingMode="modal"
                    onEditingRowSave={handleSaveRowEdits}
                    enableTopToolbar={false}
                    enableColumnActions={false}
                    enableColumnFilters={false}
                    enablePagination={false}
                    enableSorting={false}
                    positionActionsColumn='last'
                    renderBottomToolbarCustomActions={ () => (
                        <Box>
                            <Tooltip arrow title="Add New">
                                <IconButton onClick={handleCreateModalOpen}> <AddCircleIcon /> </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                    renderRowActions={({row, table}) => (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip arrow title="Edit">
                                <IconButton onClick={()=> table.setEditingRow(row)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Delete">
                                <IconButton onClick={()=> handleDeleteRow(row)} color='error'>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeHandler} variant="outlined" color='error'>Cancel</Button>
                <Button variant='outlined' onClick={handleSaveAll}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditDirectoriesDialog