import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from "@mui/material"
import { deletespot, getUserSpots, updatespot } from '../../../../actions/spotAction'



const UpdateSpot = ({ targetSpot }) => {

    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const dispatcher = useDispatch();

    const [hasId, setHasId] = useState("")
    const [spotId, setSpotId] = useState("");
    const [spotDescription, setSpotDescription] = useState("");
    const [tagName, setTagName] = useState("")
    const [transportation, setTransportation] = useState("")
    const [startTime, setStartTime] = useState("")
    const [arriveTime, setArriveTime] = useState("")
    const [arriveId, setArriveId] = useState("")
    const [travelId, setTravelId] = useState("")
    const [spotStar, setSpotStar] = useState("")

    useEffect(() => {
        if (!!targetSpot) {
            setHasId(targetSpot.has_id)
            setSpotId(targetSpot.spot_id);
            setSpotDescription(targetSpot.spot_description);
            setTagName(targetSpot.spot_tag_name);
            setTransportation(targetSpot.spot_transportation);
            setStartTime(targetSpot.spot_start_time);
            setArriveTime(targetSpot.spot_arrive_time);
            setArriveId(targetSpot.arrive_id);
            setTravelId(targetSpot.travel_id);
            setSpotStar(targetSpot.spot_star);

        }
    }, [targetSpot]);

    const handleUpdateDialogOpen = () => {
        setUpdateDialogOpen(true);
    }

    const handleUpdate = () => {
        dispatcher(
            updatespot(
                hasId,
                spotId,
                spotDescription,
                tagName,
                transportation,
                startTime,
                arriveTime,
                arriveId,
                travelId,
                spotStar,
            ))
    };


    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleUpdateDialogOpen}>
                Update
            </Button>
            <Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)}>
                <DialogTitle>編輯資料</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Has ID"
                            type="text"
                            fullWidth
                            value={hasId}
                            onChange={(e) => setHasId(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Spot ID"
                            type="text"
                            fullWidth
                            value={spotId}
                            onChange={(e) => setSpotId(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="SpotDescription"
                            type="text"
                            fullWidth
                            value={spotDescription}
                            onChange={(e) => setSpotDescription(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Tag Name"
                            type="text"
                            fullWidth
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Transportation"
                            type="text"
                            fullWidth
                            value={transportation}
                            onChange={(e) => setTransportation(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Start Time"
                            type="datetime-local"
                            fullWidth
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Arrive Time"
                            type="datetime-local"
                            fullWidth
                            value={arriveTime}
                            onChange={(e) => setArriveTime(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Travel ID"
                            type="text"
                            fullWidth
                            value={travelId}
                            onChange={(e) => setTravelId(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Spot Star"
                            type="text"
                            fullWidth
                            value={spotStar}
                            onChange={(e) => setSpotStar(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setUpdateDialogOpen(false)}>取消</Button>
                    <Button onClick={() => handleUpdate()}>確定</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UpdateSpot;