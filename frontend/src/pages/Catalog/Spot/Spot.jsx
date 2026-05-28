import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import UserSpotList from './component/UserSpotList';

const Spot = () => {

    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);

    return (
        <div>
            <UserSpotList />

        </div>
    )
}

export default Spot
