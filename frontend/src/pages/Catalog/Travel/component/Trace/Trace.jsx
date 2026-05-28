import React, { useEffect, useState } from 'react';
import '../../../../../../config.js';
import { gettravel } from '../../../../../actions/travelAction.js'; 
import { getTravelSpots } from '../../../../../actions/spotAction.js';
import { useDispatch, useSelector } from 'react-redux'

const Trace = ({index, travelid}) => {
    const dispatcher = useDispatch();

    //call /api/spot/get2
	const spotFromBackend = useSelector(state => state.spotReducer.spots);
	const spotLoaded = spotFromBackend[0]?.length > 0; // 检查 spotFromBackend 是否有数据
	useEffect(() => {
		dispatcher(getTravelSpots(travelid));
	},[travelid])

    //call map api
    useEffect(() => {
        if(spotLoaded){
            const script = document.createElement('script');
            script.src =`https://maps.googleapis.com/maps/api/js?key=${window.REACT_APP_API_KEY}&libraries=places`;     
            script.defer = true;
            document.head.appendChild(script);
            script.onload = () => {
                console.log('Google Maps API 加載完成');
                createTrace(spotFromBackend, index);
            };
    
            return () => {
                document.head.removeChild(script);
            };
        }      
    }, [spotLoaded]);

    const [instructions, setInstructions] = useState([]);
    const [passedTime, setPassedTime] = useState("");

    const createTrace = (spotFromBackend, index, passedTime) => {
        // 創建地圖
        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: spotFromBackend[0][index].spot_latitude, lng: spotFromBackend[0][index].spot_longtitude }, // 地圖中心座標
          zoom: 4, // 地圖縮放程度
        });
    
        // 创建起点和终点的标记
        const startMarker = new google.maps.Marker({
          position: { lat: spotFromBackend[0][index].spot_latitude, lng: spotFromBackend[0][index].spot_longtitude }, // 設置起點座標
          map: map,
          //label: 'Start', // 設置標記
        });
    
        const endMarker = new google.maps.Marker({
          position: { lat: spotFromBackend[0][index+1].spot_latitude, lng: spotFromBackend[0][index+1].spot_longtitude }, // 設置終點座標
          map: map,
          //label: 'End', // 設置標記
        });
    
        // 獲取路線
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
    
        const request = {
          origin: { lat: spotFromBackend[0][index].spot_latitude, lng: spotFromBackend[0][index].spot_longtitude }, // 起點座標
          destination: { lat: spotFromBackend[0][index+1].spot_latitude, lng: spotFromBackend[0][index+1].spot_longtitude }, // 終點座標
          travelMode: spotFromBackend[0][index].spot_transportation, // 交通方式
        };

        directionsService.route(request, function (result, status) {
          if (status === 'OK') {
            // 在地圖上繪製路線
            directionsRenderer.setDirections(result);
            directionsRenderer.setMap(map);

            const steps = result.routes[0].legs[0].steps;
            const instructions = steps.map(step => step.instructions);
            setInstructions(instructions);

            const duration = result.routes[0].legs[0].duration.text;
            setPassedTime(duration);
          }
        });
    };
    
    return (
        <div>
            <div id="map" style={{ height: '400px' }}></div>
            <p>出發地點: {spotFromBackend[0][index].spot_name}</p>
            <p>目的地: {spotFromBackend[0][index+1].spot_name}</p>
            <p>交通方式: {spotFromBackend[0][index].spot_transportation}</p>
            <p>具體路線: </p>
            <ul>
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
            <p>預計所需時間: {passedTime}</p>
        </div>
    );
}

export default Trace