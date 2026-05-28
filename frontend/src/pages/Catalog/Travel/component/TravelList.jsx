import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material"
import { getgroup } from '../../../../actions/groupAction.js'
import { gettravel, deletetravel } from './../../../../actions/travelAction.js'
import EditTravel from './EditTravel.jsx'
import DeleteTravel from './DeleteTravel.jsx'
import DoneTravel from './DoneTravel.jsx'
import TravelDetail from '../TravelDetail.jsx'

const TravelList = () => {

    const dispatcher = useDispatch();
    const [selectedTravel, setSelectedTravel] = useState("");
    const travels = useSelector(state => state.travelReducer.travels);
    useEffect(() => {
        dispatcher(gettravel());
    }, [])

    const [groupName, setGroupName] = useState("");
    const groups = useSelector(state => state.groupReducer.groups);
    useEffect(() => {
        dispatcher(getgroup());
    }, [])

    const getGroupName = (group_id) => {
        if (groups.length === 0) {
            return "ERROR";
        }

        const groupArray = groups[0];
        const group = groupArray.find(group => group.group_id === group_id);
        return group ? group.group_name : "YOU";
    };

    const sortedTravels = travels.length > 0 ? [...travels[0]].sort((a, b) => {
        const dateA = new Date(a.travel_date);
        const dateB = new Date(b.travel_date);
        return dateA - dateB;
    }) : [];

    const getFormattedDate = (dateString) => {
        var date = new Date(dateString);
        var year = date.getUTCFullYear();
        var month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
        var day = ('0' + date.getUTCDate()).slice(-2);

        // 创建 MySQL 日期格式字符串
        date = year + '-' + month + '-' + day;
        return date;
    };

    const [selectedTravelId, setSelectedTravelId] = useState("");
    const [detailOpen, setDetailOpen] = useState(false);

    const handleDetailClickOpen = (travelid) => {
        setSelectedTravelId(travelid)
        setDetailOpen(true);
    };

    const handleDetailClose = () => {
        setDetailOpen(false);
    };

    return (
        // <div>
        //     <List style={{ display: 'flex', flexDirection: 'column' }}>
        //         <ListItem style={{ backgroundColor: 'lightblue', padding: '10px', width: '100%' }}>
        //             <ListItemText primary="Travel Name" style={{ flex: '1' }}/>
        //             <ListItemText primary="Creator Name" style={{ flex: '1' }} />
        //             <ListItemText primary="Travel Date" style={{ flex: '1' }} />
        //             <ListItemText primary="" style={{ flex: '1' }} />

        //         </ListItem>
        //         {sortedTravels.length > 0 ? (
        //             sortedTravels.map((travel) => {
        //                 const groupName = getGroupName(travel.group_id);
        //                 return (
        //                     <tr key={travel.travel_id} style={{ display: 'table-row' }}>
        //                         <td style={{ display: 'table-cell', width: '33%' }}>
        //                             <ListItemText primary={travel.travel_name} />
        //                         </td>
        //                         <td style={{ display: 'table-cell', width: '33%' }}>
        //                             <ListItemText primary={groupName} />
        //                         </td>
        //                         <td style={{ display: 'table-cell', width: '33%' }}>
        //                             <ListItemText primary={getFormattedDate(travel.travel_date)} />
        //                         </td>
        //                         <td>
        //                             <DoneTravel targetTravel={travel} />
        //                         </td>
        //                         <td>
        //                             <Button variant="contained" color="warning" style={{ marginRight: '10px' }} onClick={() => handleDetailClickOpen(travel.travel_id)}>
        //                                 SET
        //                             </Button>
        // <Dialog open={detailOpen} onClose={handleDetailClose}>
        //     <DialogTitle>Travel Detail</DialogTitle>
        //     <DialogContent>
        //         <div>
        //             <TravelDetail travelid={selectedTravelId} />
        //         </div>
        //     </DialogContent>
        //     <DialogActions>
        //         <Button onClick={handleDetailClose}>Cancel</Button>
        //     </DialogActions>
        // </Dialog>
        //                         </td>
        //                         <td>
        //                             <EditTravel targetTravel={travel} />
        //                         </td>
        //                         <td>
        //                             <DeleteTravel travelId={travel.travel_id} />
        //                         </td>
        //                     </tr>
        //                 );
        //             })
        //         ) : (
        //             <ListItem>
        //                 <ListItemText primary="No travels available" />
        //             </ListItem>
        //         )}
        //     </List>
        // </div>
        <div>
            <table style={{ width: '100%' }}>
                <thead>
                    <tr style={{ backgroundColor: 'lightblue' }}>
                        <th style={{ flex: '1', padding: '10px', textAlign: 'center' }}>
                            <ListItemText primary="Travel Name" />
                        </th>
                        <th style={{ flex: '1', padding: '10px', textAlign: 'center' }}>
                            <ListItemText primary="Creator Name" />
                        </th>
                        <th style={{ flex: '1', padding: '10px', textAlign: 'center' }}>
                            <ListItemText primary="Travel Date" />
                        </th>
                        <th style={{ flex: '1', padding: '10px', textAlign: 'center' }}>
                            <ListItemText primary="Action" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTravels.length > 0 ? (
                        sortedTravels.map((travel) => {
                            const groupName = getGroupName(travel.group_id);
                            return (
                                <tr key={travel.travel_id}>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        <ListItemText primary={travel.travel_name} />
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        <ListItemText primary={groupName} />
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        <ListItemText primary={getFormattedDate(travel.travel_date)} />
                                    </td>
                                    <td style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                        <DoneTravel targetTravel={travel} />
                                        <Button variant="contained" color="warning" style={{ marginRight: '10px' }} onClick={() => handleDetailClickOpen(travel.travel_id)}>
                                            SET
                                        </Button>
                                        <Dialog open={detailOpen} onClose={handleDetailClose}>
                                            <DialogTitle>Travel Detail</DialogTitle>
                                            <DialogContent>
                                                <div>
                                                    <TravelDetail travelid={selectedTravelId} />
                                                </div>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleDetailClose}>Cancel</Button>
                                            </DialogActions>
                                        </Dialog>
                                        <EditTravel targetTravel={travel} />
                                        <DeleteTravel travelId={travel.travel_id} />
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                <ListItemText primary="No travels available" />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}

export default TravelList;
