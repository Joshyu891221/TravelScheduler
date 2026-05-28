import { useState, useEffect } from 'react'
import { createspot } from '../../../../actions/spotAction.js';
import { useDispatch, useSelector } from 'react-redux'
import { getTravelSpots } from '../../../../actions/spotAction.js';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Select,
    MenuItem,
} from '@mui/material';


const CreateSpot = () => {

    const dispatcher = useDispatch();
    // const spots = useSelector(state => state.spotReducer.spots);
    const [open, setOpen] = useState(false);
    const [spotName, setSpotName] = useState("");

    useEffect(() => {
        dispatcher(getTravelSpots());
    }, [])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        // call api here
        dispatcher(createspot(
            spotName,
   
        ));
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Create spot
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new spot</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            type="text"
                            fullWidth
                            value={spotName}
                            onChange={(e) => setspotName(e.target.value)}
                        />
                        {/* <Select
                            margin="dense" s
                            label="Group Name"
                            type="text"
                            fullWidth
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}

                        >
                            <MenuItem value="">Select Group</MenuItem> 
                            {groups[0].map(group => (
                                group.group_name && group.group_id ? (
                                    <MenuItem key={group.group_id} value={group.group_id}>
                                        {group.group_name}
                                    </MenuItem>
                                ) : null
                            ))}
                        </Select> */}
                        <Select
                            margin="dense"
                            label="Group Name"
                            type="text"
                            fullWidth
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                        >
                            {Array.isArray(groups) && Array.isArray(groups[0]) && groups[0].map(group => (
                                group.group_name && group.group_id ? (
                                    <MenuItem key={group.group_id} value={group.group_id}>
                                        {group.group_name}
                                    </MenuItem>
                                ) : null
                            ))}
                        </Select>
                        <TextField
                            margin="dense"
                            label="Date"
                            type="date"
                            fullWidth
                            value={spotDate}
                            onChange={(e) => setspotDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        {/* <TextField
                            margin="dense"
                            label="Number of People"
                            type="text"
                            fullWidth
                            value={spotPeoplenum}
                            onChange={(e) => setspotPeoplenum(e.target.value)}
                        /> */}
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            value={spotDescription}
                            onChange={(e) => setspotDescription(e.target.value)}
                        />
                        {/* <TextField
                            margin="dense"
                            label="Done"
                            type="text"
                            fullWidth
                            value={spotDone}
                            onChange={(e) => setspotDone(e.target.value)}
                        /> */}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Createspot
