import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletetravel } from '../../../../actions/travelAction';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

const DeleteTravel = ({travelId}) => {
    // console.log(travelId);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    // const [targettravelId, setTargetTravelId] = useState(travelId);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        console.log(travelId);
        dispatch(deletetravel(travelId));
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>確認刪除</DialogTitle>
                <DialogContent>
                    確定要刪除這個地點嗎?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteTravel;
