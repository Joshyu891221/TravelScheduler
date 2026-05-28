import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from './../../../actions/loginAction.js'
import { Button } from '@mui/material'
import CreateGroup from './component/Group/CreateGroup.jsx'
import GroupList from './component/Group/GroupList.jsx'
import TopRow from './../common/TopRow.jsx'
import InfoCard from './component/User/InfoCard.jsx'
import CardBottom from './component/User/CardBottom.jsx'

const User = () => {

    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(getUser());
    }, [])

    return (
        <div>
            <TopRow/>
            <InfoCard/>
            <CardBottom/>
            <CreateGroup/>
            <GroupList/>
        </div>
    )
}

export default User
