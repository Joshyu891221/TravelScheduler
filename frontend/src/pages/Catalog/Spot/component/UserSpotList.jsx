import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from "@mui/material"
import { deletespot, getUserSpots, updatespot } from '../../../../actions/spotAction'
import UpdateSpot from './UpdateSpot'
import DeleteSpot from './DeleteSpot'
const UserSpotList = () => {

    const dispatcher = useDispatch();

    const undone_spots = useSelector(state => state.userspotReducer.undone_spots);
    const done_spots = useSelector(state => state.userspotReducer.done_spots);
    const star_spots = useSelector(state => state.userspotReducer.star_spots);
    const [open, setOpen] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);

    useEffect(() => {
        dispatcher(getUserSpots())
        console.log(star_spots);
    }, []);

    // console.log(star_spots);


    const handleClickOpen = (spot) => {
        setSelectedSpot(spot);
        // console.log(selectedSpot);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };






    return (
        <div>
            {/* ==============================UnDone============================================ */}

            <h2>"尚未去過的地點"</h2>
            {undone_spots.length > 0 ? (
                undone_spots[0].map((spot) => (
                    <div key={spot.spot_id}>
                        <Button variant="contained" color="primary" style={{ marginBottom: '10px' }} onClick={() => handleClickOpen(spot)}>
                            {spot.spot_name}
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{selectedSpot && selectedSpot.spot_name}</DialogTitle>
                            <DialogContent>

                                <List>
                                    <ListItem>
                                        <ListItemText primary={`SpotID: ${selectedSpot && selectedSpot.spot_id}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Name: ${selectedSpot && selectedSpot.spot_name}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Location: ${selectedSpot && selectedSpot.spot_location}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Rank: ${selectedSpot && selectedSpot.spot_rank}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Openhour: ${selectedSpot && selectedSpot.spot_openhour}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Description: ${selectedSpot && selectedSpot.spot_description}`} />
                                    </ListItem>

                                </List>

                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
                                {/* <UpdateSpot targetSpot={spot}/> */}
                                {/* <DeleteSpot targetSpot={spot}/> */}
                                {/* <Button onClick={confirmDelete}>Delete</Button> */}
                                {/* <Button onClick={handleUpdateDialogOpen}>Update</Button> */}

                            </DialogActions>
                        </Dialog>

                    </div>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No spots available" />
                </ListItem>
            )}

            {/* ==============================Done============================================ */}
            <h2>"去過的地點"</h2>
            {done_spots.length > 0 ? (
                done_spots[0].map((spot) => (
                    <div key={spot.spot_id}>
                        <Button variant="contained" color="primary" style={{ marginBottom: '10px' }} onClick={() => handleClickOpen(spot)}>
                            {spot.spot_name}
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{selectedSpot && selectedSpot.spot_name}</DialogTitle>
                            <DialogContent>
                                <List>
                                    <ListItem>
                                        <ListItemText primary={`SpotID: ${selectedSpot && selectedSpot.spot_id}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Name: ${selectedSpot && selectedSpot.spot_name}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Location: ${selectedSpot && selectedSpot.spot_location}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Rank: ${selectedSpot && selectedSpot.spot_rank}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Openhour: ${selectedSpot && selectedSpot.spot_openhour}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Description: ${selectedSpot && selectedSpot.spot_description}`} />
                                    </ListItem>

                                </List>

                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
                                {/* <UpdateSpot targetSpot={spot}/> */}
                                {/* <DeleteSpot targetSpot={spot}/> */}
                                {/* <Button onClick={confirmDelete}>Delete</Button> */}
                                {/* <Button onClick={handleUpdateDialogOpen}>Update</Button> */}

                            </DialogActions>
                        </Dialog>

                    </div>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No spots available" />
                </ListItem>
            )}

            {/* ==============================Star============================================ */}

            <h2>"收藏的地點"</h2>
            {star_spots.length > 0 ? (
                star_spots[0].map((spot) => (
                    <div key={spot.spot_id}>
                        <Button variant="contained" color="primary" style={{ marginBottom: '10px' }} onClick={() => handleClickOpen(spot)}>
                            {spot.spot_name}
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>{selectedSpot && selectedSpot.spot_name}</DialogTitle>
                            <DialogContent>

                                <List>
                                    <ListItem>
                                        <ListItemText primary={`SpotID: ${selectedSpot && selectedSpot.spot_id}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Name: ${selectedSpot && selectedSpot.spot_name}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Location: ${selectedSpot && selectedSpot.spot_location}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Rank: ${selectedSpot && selectedSpot.spot_rank}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Openhour: ${selectedSpot && selectedSpot.spot_openhour}`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Description: ${selectedSpot && selectedSpot.spot_description}`} />
                                    </ListItem>

                                </List>

                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
                                {/* <UpdateSpot targetSpot={spot}/> */}
                                {/* <DeleteSpot targetSpot={spot}/> */}
                                {/* <Button onClick={confirmDelete}>Delete</Button> */}
                                {/* <Button onClick={handleUpdateDialogOpen}>Update</Button> */}

                            </DialogActions>
                        </Dialog>

                    </div>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No spots available" />
                </ListItem>
            )}
        </div>
    )
}

export default UserSpotList