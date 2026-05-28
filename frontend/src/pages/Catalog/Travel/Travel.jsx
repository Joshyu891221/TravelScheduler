import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import CreateTravel from './component/CreateTravel';
import DeleteTravel from './component/DeleteTravel';
import TravelList from './component/TravelList';
import EditTravel from './component/EditTravel';
import TravelDetail from './TravelDetail';
import { useState } from 'react';

const Travel = () => {

    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);

    // // ====================SET==================== 
    // const [selectedTravel, setSelectedTravel] = useState(null);  
    // const [showTravelDetail, setShowTravelDetail] = useState(false);
    // const handleSetButton = () => {
    //     setShowTravelDetail(true);
    // };
    // // ====================SET====================
    return (
        <div>
            {/* {showTravelDetail && (
            <div>
                <TravelDetail travel={selectedTravel}/>
            </div>
            )} */}

            <p>Travel</p>
            <br />

            <CreateTravel />

            <br />

            {/* <EditTravel /> */}

            <br />

            {/* <DeleteTravel /> */}
            <TravelList />
        </div>
    )
}

export default Travel
