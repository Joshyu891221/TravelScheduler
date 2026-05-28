import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'

const Map_Detail = ({ onCancel, place, onConfirm }) => {
    const cancel = () => {
        onCancel();
    }

    const enter = () => {
        onConfirm({
            name: place.name,
            lat: place.lat,
            lng: place.lng,
            location: place.location,
            rating: place.rating,
            types: place.types,
            openingHours: place.openingHours
        });
        console.log('點擊的店家名稱:', place.name);
        console.log('點擊位置的經度:', place.lng);
        console.log('點擊位置的緯度:', place.lat);
        console.log('店家地址:', place.location);
        console.log('店家的類型:', place.types);
        console.log('店家的評價:', place.rating);
        if(place.openingHours){
            console.log('營業時間：');
            console.log(place.openingHours);
        } else {
          console.log('沒有提供營業時間資訊。');
        }
        onCancel();
    }

    return (
        <div>
            <h2>是否要將此地點加入Travel</h2>
            <Button style={{ marginRight: '10px' }} onClick={enter} variant="contained" color="success" size="small">確定</Button>
            <Button onClick={cancel} variant="contained" color="error" size="small">取消</Button>
        </div>
    )
}

export default Map_Detail;