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

const DoneTravel = ({ targetTravel }) => {
    // console.log(targetTravel);
    // const [targetTravel,setTargetTravel] = useState(test);
    const dispatcher = useDispatch();
    // const [open, setOpen] = useState(false);
    const [targetTravelId, setTargetTravelId] = useState(targetTravel.travel_id);
    const [targetTravelName, setTargetTravelName] = useState(targetTravel.travel_name);
    const [targetGroupId, setTargetGroupId] = useState(targetTravel.group_id);
    const [targetTravelDate, setTargetTravelDate] = useState(targetTravel.travel_date);
    const [targetTravelPeoplenum, setTargetTravelPeoplenum] = useState(targetTravel.travel_peoplenum);
    const [targetTravelDescription, setTargetTravelDescription] = useState(targetTravel.travel_description);
    const [targetTravelDone, setTargetTravelDone] = useState(targetTravel.travel_done);

    const [isDone, setIsDone] = useState(targetTravel.travel_done === "1");

    // console.log(travelId);
    //============Get GroupID============
    // const [groupId, setGroupId] = useState("");
    // const groups = useSelector(state => state.groupReducer.groups);
    // useEffect(() => {
    //     dispatcher(getgroup());
    // }, [])
    //============Get GroupID============

    // useEffect(() => {
    //     // setTargetTravel(test);
    //     if (!!targetTravel) {
    //         setTargetTravelId(targetTravel.travel_id);
    //         setTargetTravelName(targetTravel.travel_name);
    //         setTargetGroupId(targetTravel.group_id);
    //         setTargetTravelDate(targetTravel.travel_date);
    //         setTargetTravelPeoplenum(targetTravel.travel_peoplenum);
    //         setTargetTravelDescription(targetTravel.travel_description);
    //         setTargetTravelDone(targetTravel.travel_done);
    //     }
    //             console.log("useEffect");

    // }, [targetTravel]);

    const handleToggleDone = () => {
        // console.log("toggle");

        if (targetTravelDone === "0") {
            setTargetTravelDone("1");
        }
        else if (targetTravelDone === "1") {
            setTargetTravelDone("0");
        }
    };
    // useEffect(() => {
    //     console.log(targetTravelDone);
    //   }, [targetTravelDone]);


    useEffect(() => {
        // 將 travelDate 轉換為指定格式
        // const formattedDate = new Date(targetTravelDate).toLocaleDateString();
        var date = new Date(targetTravelDate);
        var year = date.getUTCFullYear();
        var month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
        var day = ('0' + date.getUTCDate()).slice(-2);

        // 创建 MySQL 日期格式字符串
        date = year + '-' + month + '-' + day;
        
        dispatcher(
            edittravel(
                targetTravelId,
                targetTravelName,
                date,
                targetTravelPeoplenum,
                targetTravelDescription,
                targetTravelDone,
                targetGroupId,
            )
        );
    }, [targetTravelDone]);

    const handleClick = () => {
        setIsDone(!isDone);
        handleToggleDone();
    };

    return (
        <div>
            <button style={{ marginRight: '10px', width: '70px', height: '30px' }} onClick={handleClick}>
                {!isDone ? "Done" : "Undone"}
            </button>


        </div>
    );
};

export default DoneTravel;
