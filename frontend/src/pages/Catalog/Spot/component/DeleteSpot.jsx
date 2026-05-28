import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletespot } from '../../../../actions/spotAction';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

const DeleteSpot = (targetSpot) => {
    // console.log(targetSpot);
    const [hasId, setHasId] = useState("");
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const confirmDelete = () => {
        setConfirmDialogOpen(true);
    };
    const handleDelete = (hasId) => {
        dispatcher(deletespot(hasId));
        setConfirmDialogOpen(false);
        setOpen(false);
    };
    return (
        <div>
            {/* Delete */}
            <Button variant="contained" color="primary" onClick={confirmDelete}>
                Delete
            </Button>
            <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                <DialogTitle>確認刪除</DialogTitle>
                <DialogContent>
                    確定要刪除這個地點嗎?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)}>取消</Button>
                    {/* HASID */}
                    <Button onClick={() => handleDelete(hasId)}>確定</Button>
                    {/* HASID */}
                </DialogActions>
            </Dialog>
        </div>
    );

};
export default DeleteSpot;