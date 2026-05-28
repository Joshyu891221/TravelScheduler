import { useState,useEffect } from 'react';
import { createUseStyles } from 'react-jss'
import { useNavigate, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import UserNavIcon from './../../../assets/BottomNavbar/userNavIcon.png'
import UserNavIconFc from './../../../assets/BottomNavbar/userNavIconFc.png'
import TravelNavIcon from './../../../assets/BottomNavbar/travelNavIcon.png'
import TravelNavIconFc from './../../../assets/BottomNavbar/travelNavIconFc.png'
import SpotNavIcon from './../../../assets/BottomNavbar/spotNavIcon.png'
import SpotNavIconFc from './../../../assets/BottomNavbar/spotNavIconFc.png'

const BottomNavbar = () => {
    
    const useStyles = createUseStyles({
        Container: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '82px',
            position: 'fixed',
            bottom: '0px',
            left: '0px',
            zIndex: 999,
            background: '#FFFFFF',
            boxShadow: '0px 1px 4px rgba(210, 188, 131, 0.15)',
            backdropFilter: 'blur(30px)',
            /* Note: backdrop-filter has minimal browser support */
            borderRadius: '100px',
        },
        Slider: {
            position: 'absolute',
            background: 'rgba(255, 184, 0, 0.2)',
            borderRadius: '100px',
            height: '40px',
            width: '18%',
            transition: 'transform 0.3s ease-in-out',
            zIndex: '-1',
        },
        Img: {
            width: '25px',
            height: '25px',
        },
    })

    const classes = useStyles();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);

    const getDefaultValues = () => {
        switch(location.pathname) {
            case '/catalog/user':
                return {
                    index: 0,
                    position: '-185%',
                }
            case '/catalog/travel':
                return {
                    index: 1,
                    position: '0%',
                }
            case '/catalog/spot':
                return {
                    index: 2,
                    position: '185%',
                }
        }
    }

    const Default = getDefaultValues();
    const [selectedImageIndex, setSelectedImageIndex] = useState(Default.index);
    const [sliderPosition, setSliderPosition] = useState(Default.position);
    const navigate = useNavigate();

    const SlideTo = (index, position) => {
        setSelectedImageIndex(index);
        setSliderPosition(position);
    }
    
    const Navigate = (newValue) => {
        setValue(newValue);
        switch (newValue) {
            case '/catalog/user':
                SlideTo(0, '-185%');
                navigate('/catalog/user', { state: { from: location.pathname }});
                break;
            case '/catalog/travel':
                SlideTo(1, '0%');
                navigate('/catalog/travel', { state: { from: location.pathname }});
                break;
            case '/catalog/spot':
                SlideTo(2, '185%');
                navigate('/catalog/spot', { state: { from: location.pathname }});
                break;
            default:
                console.log("no matched path to redirect");
                break;
        };
    };

    return (
        <div className={classes.Container}>
            <div className={classes.Slider}
                style={{ transform: `translateX(${sliderPosition})` }}
            ></div>
            <div onClick={() => {Navigate('/catalog/user')}}>
                <img className={classes.Img} src={UserNavIcon} alt="UserNavIcon"/>
            </div>
            <div onClick={() => {Navigate('/catalog/travel')}}>
                <img className={classes.Img} src={TravelNavIcon} alt="TravelNavIcon"/>
            </div>
            <div onClick={() => {Navigate('/catalog/spot')}}>
                <img className={classes.Img} src={SpotNavIcon} alt="SpotNavIcon"/>
            </div>
        </div>
    )
}


export default BottomNavbar
