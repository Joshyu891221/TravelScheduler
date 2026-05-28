import React, { useEffect, useState, useRef } from 'react';
import '../../../../../../config.js';
import Map_Detail from './MapDetail.jsx';
import ArriveTime from '../Time/ArriveTime.jsx';
import StartTime from '../Time/StartTime.jsx';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material'
import { createspot } from '../../../../../actions/spotAction.js';
import { useDispatch } from 'react-redux'
import moment from 'moment';

const useStyles = makeStyles({
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        width: 300,
        height: 100
    },
    time: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        width: 150,
        height: 90
    }
});

const Map2 = ({ close, renew, travelid, arriveID }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchLocation, setSearchLocation] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [showAddMsg, setShowAddMsg] = useState(false);
    const [clickPlace, setClickPlace] = useState({
        name: null, lat: null, lng: null,
        location: null, rating: null, openingHours: null, types: []
    });
    const [showStartTime, setShowStartTime] = useState(false);
    const [showArriveTime, setShowArriveTime] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [arriveTime, setArriveTime] = useState(null);
    const [selectedPlaceInfo, setSelectedPlaceInfo] = useState(null);
    const [showSelectedPlaceInfo, setShowSelectedPlaceInfo] = useState(false);

    const mapRef = useRef(null);
    const classes = useStyles();
    const dispatcher = useDispatch();

    const passToBackend = () => {
        const openingHoursString = JSON.stringify(selectedPlaceInfo.openingHours);
        const startTimeFormatted = moment(startTime, 'h:mm A').format('YYYY-MM-DD HH:mm:ss');
        const arriveTimeFormatted = moment(arriveTime, 'h:mm A').format('YYYY-MM-DD HH:mm:ss');

        dispatcher(createspot(
            selectedPlaceInfo.name,
            selectedPlaceInfo.lat,
            selectedPlaceInfo.lng,
            selectedPlaceInfo.location,
            selectedPlaceInfo.rating,
            openingHoursString,
            selectedPlaceInfo.types,
            arriveID,
            startTimeFormatted,
            arriveTimeFormatted,
            travelid,
        ));
        callMsg();
    };

    const panelClose = () => setShowPanel(false);
    const callMsg = () => setShowAddMsg(true);
    const closeMsg = () => close();
    const callStartTime = () => setShowStartTime(true);
    const closeStartTime = () => setShowStartTime(false);
    const updateStartTime = (time) => setStartTime(time);
    const callArriveTime = () => setShowArriveTime(true);
    const closeArriveTime = () => setShowArriveTime(false);
    const updateArriveTime = (time) => setArriveTime(time);

    const handleSearch = async () => {
        if (!searchLocation) return;
        setShowMap(true);

        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        const map = new window.google.maps.Map(mapElement, {
            zoom: 16,
            center: searchLocation,
        });
        mapRef.current = map;

        try {
            const { Place } = await window.google.maps.importLibrary('places');
            const { places } = await Place.searchByText({
                textQuery: searchQuery,
                fields: ['displayName', 'location', 'rating', 'regularOpeningHours', 'types', 'formattedAddress', 'id'],
                locationBias: searchLocation,
            });

            places.forEach(place => {
                const marker = new window.google.maps.Marker({
                    map: map,
                    position: place.location,
                    title: place.displayName,
                });
                marker.addListener('click', () => handleMapClick(place));
            });
        } catch (err) {
            console.error('Places search error:', err);
        }
    };

    const handleMapClick = async (place) => {
        setShowPanel(true);
        try {
            await place.fetchFields({
                fields: ['displayName', 'location', 'rating', 'regularOpeningHours', 'types', 'formattedAddress']
            });

            const openingHours = place.regularOpeningHours;
            const placeData = {
                name: place.displayName,
                lat: place.location.lat(),
                lng: place.location.lng(),
                location: place.formattedAddress,
                rating: place.rating,
                openingHours: openingHours ? openingHours.weekdayDescriptions : '無營業時間',
                types: place.types ? place.types[0] : ''
            };

            setClickPlace(placeData);
            setSelectedPlaceInfo(placeData);
        } catch (err) {
            console.error('Place details error:', err);
        }
    };

    const handleConfirm = (placeInfo) => {
        setSelectedPlaceInfo(placeInfo);
        setShowSelectedPlaceInfo(true);
    };

    useEffect(() => {
        if (searchQuery !== '') {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: searchQuery }, (results, status) => {
                if (status === window.google.maps.GeocoderStatus.OK) {
                    setSearchLocation(results[0].geometry.location);
                }
            });
        }
    }, [searchQuery]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${window.REACT_APP_API_KEY}&v=beta&libraries=places`;
        script.defer = true;
        document.head.appendChild(script);
        return () => { document.head.removeChild(script); };
    }, []);

    useEffect(() => {
        if (searchLocation && showMap) {
            handleSearch();
        }
    }, [searchLocation, showMap]);

    return (
        <div>
            <h3>My Google Maps Demo</h3>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <Button onClick={handleSearch} variant="outlined" color="secondary" size="small">搜尋</Button>
            </div>

            {selectedPlaceInfo && showSelectedPlaceInfo && (
                <div>
                    <p>地點名稱: {selectedPlaceInfo.name}</p>
                    <p>地點經度: {selectedPlaceInfo.lng}</p>
                    <p>地點緯度: {selectedPlaceInfo.lat}</p>
                    <p>地點地址: {selectedPlaceInfo.location}</p>
                    <p>地點評價: {selectedPlaceInfo.rating}</p>
                    <p>地點營業時間: {Array.isArray(selectedPlaceInfo.openingHours) ? selectedPlaceInfo.openingHours.join(', ') : selectedPlaceInfo.openingHours}</p>
                    <p>地點類型: {selectedPlaceInfo.types}</p>
                    <p>抵達時間: {startTime}</p>
                    <p>離開時間: {arriveTime}</p>
                    <Button onClick={callStartTime} variant="outlined" color="info" style={{ marginRight: '10px' }}>選擇抵達時間</Button>
                    <Button onClick={callArriveTime} variant="outlined" color="info">選擇離開時間</Button>
                    <br />
                    {startTime && arriveTime && (
                        <Button onClick={passToBackend} variant="outlined" color="success" style={{ marginTop: '10px' }}>確定</Button>
                    )}
                </div>
            )}
            <br />
            {showMap && <div id="map" style={{ height: '400px', width: '100%' }}></div>}

            {showAddMsg && (
                <div className={classes.modal}>
                    <div className={classes.modalContent}>
                        <p>已成功新增地點</p>
                        <Button onClick={closeMsg} variant="contained" color="success" style={{ marginTop: '10px' }}>確定</Button>
                    </div>
                </div>
            )}

            {showPanel && (
                <div className={classes.modal}>
                    <div className={classes.modalContent}>
                        <Map_Detail onCancel={panelClose} onConfirm={handleConfirm} place={clickPlace} />
                    </div>
                </div>
            )}

            {showStartTime && (
                <div className={classes.time}>
                    <div className={classes.timeContent}>
                        <StartTime Close={closeStartTime} updateStartTime={updateStartTime} />
                    </div>
                </div>
            )}

            {showArriveTime && (
                <div className={classes.time}>
                    <div className={classes.timeContent}>
                        <ArriveTime Close={closeArriveTime} updateArriveTime={updateArriveTime} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Map2;
