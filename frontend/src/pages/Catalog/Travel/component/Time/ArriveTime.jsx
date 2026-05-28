import React, { useEffect, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import Button from '@mui/material/Button'
import moment from 'moment';

const ArriveTime = ({ Close, updateArriveTime }) => {
    const [selectedTime, setSelectedTime] = useState(new Date());

    const handleTimeChange = (newTime) => {
        const updatedTime = new Date();
        updatedTime.setHours(newTime.getHours(), newTime.getMinutes(), 0);
        setSelectedTime(updatedTime);
    };

    const handleConfirmClick = () => {
        if(selectedTime){
            const timeString = moment(selectedTime).format('h:mm A');
            updateArriveTime(timeString);
            Close();
        }      
    };

    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopTimePicker 
                    value={selectedTime}
                    onChange={handleTimeChange}
                />
            </LocalizationProvider>
            
            <Button style={{ marginTop: '10px' }} onClick={handleConfirmClick} variant="contained" color="success" size="small">確定</Button>
            <Button style={{ marginLeft: '10px', marginTop: '10px' }} onClick={Close} variant="contained" color="error" size="small">取消</Button>
        </div>
    );
}

export default ArriveTime