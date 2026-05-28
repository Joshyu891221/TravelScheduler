import { useState, useEffect } from 'react';
import { edittravel } from '../../../../actions/travelAction';
import { useDispatch, useSelector } from 'react-redux';
import { getgroup } from './../../../../actions/groupAction.js'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Select,
    MenuItem,
    InputLabel, // 新增

} from '@mui/material';

const EditTravel = ({ targetTravel }) => {
    // console.log(targetTravel);
    // const [targetTravel,setTargetTravel] = useState(test);
    const dispatcher = useDispatch();
    const [open, setOpen] = useState(false);
    const [targetTravelId, setTargetTravelId] = useState("");
    const [targetTravelName, setTargetTravelName] = useState("");
    const [targetGroupId, setTargetGroupId] = useState("");
    const [targetTravelDate, setTargetTravelDate] = useState("");
    const [targetTravelPeoplenum, setTargetTravelPeoplenum] = useState("");
    const [targetTravelDescription, setTargetTravelDescription] = useState("");
    const [targetTravelDone, setTargetTravelDone] = useState("");
    // console.log(travelId);
    //============Get GroupID============
    const [groupId, setGroupId] = useState("");
    const groups = useSelector(state => state.groupReducer.groups);
    useEffect(() => {
        dispatcher(getgroup());
    }, [])
    //============Get GroupID============

    useEffect(() => {
        // setTargetTravel(test);
        if (!!targetTravel) {
            setTargetTravelId(targetTravel.travel_id);
            setTargetTravelName(targetTravel.travel_name);
            setTargetGroupId(targetTravel.group_id);
            setTargetTravelDate(targetTravel.travel_date);
            setTargetTravelPeoplenum(targetTravel.travel_peoplenum);
            setTargetTravelDescription(targetTravel.travel_description);
            setTargetTravelDone(targetTravel.travel_done);
        }
    }, [targetTravel]);
    //   console.log(travelId);
    // console.log(targetTravel);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        // 將 travelDate 轉換為指定格式
        // const formattedDate = new Date(targetTravelDate).toLocaleDateString();
        dispatcher(
            edittravel(
                targetTravelId,
                targetTravelName,
                targetTravelDate,
                targetTravelPeoplenum,
                targetTravelDescription,
                targetTravelDone,
                targetGroupId,
            )
        );
        setOpen(false);
    };



    return (
        <div>
            <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handleClickOpen}>
                Update
            </Button>
            <Dialog open={open && !!targetTravel} onClose={handleClose}>
                <DialogTitle>Update Travel</DialogTitle>
                <DialogContent>
                    <form>
                        {/* <TextField
                            autoFocus
                            margin="dense"
                            label="Travel ID"
                            type="text"
                            fullWidth
                            value={targetTravelId}
                            onChange={(e) => setTargetTravelId(e.target.value)}
                        /> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            label="New Travel Name"
                            type="text"
                            fullWidth
                            value={targetTravelName}
                            onChange={(e) => setTargetTravelName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="New Date"
                            type="datetime-local"
                            fullWidth
                            value={targetTravelDate}
                            onChange={(e) => setTargetTravelDate(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="New Description"
                            type="text"
                            fullWidth
                            value={targetTravelDescription}
                            onChange={(e) => setTargetTravelDescription(e.target.value)}
                        />
                        {/* <Select
                            margin="dense"
                            label="Group Name"
                            type="text"
                            fullWidth
                            value={targetGroupId || ""}
                            onChange={(e) => setTargetGroupId(e.target.value)}
                        >
                            <MenuItem value="">無</MenuItem>
                            {Array.isArray(groups) && Array.isArray(groups[0]) && groups[0].map(group => (
                                group.group_name && group.group_id ? (
                                    <MenuItem key={group.group_id} value={group.group_id}>
                                        {group.group_name}
                                    </MenuItem>
                                ) : null
                            ))}
                        </Select> */}
                        <InputLabel htmlFor="group-select">Group Name</InputLabel>
                        <Select
                            margin="dense"
                            labelId="group-select"
                            id="group-select"
                            fullWidth
                            value={targetGroupId || ""}
                            onChange={(e) => setTargetGroupId(e.target.value)}
                        >
                            <MenuItem value="">無</MenuItem>
                            {Array.isArray(groups) && Array.isArray(groups[0]) && groups[0].map(group => (
                                group.group_name && group.group_id ? (
                                    <MenuItem key={group.group_id} value={group.group_id}>
                                        {group.group_name}
                                    </MenuItem>
                                ) : null
                            ))}
                        </Select>


                        {/* <TextField
                            autoFocus
                            margin="dense"
                            label="Done or Not"
                            type="text"
                            fullWidth
                            value={targetTravelDone}
                            onChange={(e) => setTargetTravelDone(e.target.value)}
                        /> */}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditTravel;
