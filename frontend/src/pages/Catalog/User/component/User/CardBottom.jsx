import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { loggedoutwithgoogle } from '../../../../../actions/loginAction.js'
import LogoutIcon from './../../../../../assets/CardBottom/logoutIcon.png'
import LogoutIconHovered from './../../../../../assets/CardBottom/logoutIconHovered.png'

const CardBottom = () => {
    
    const [isHovered, setIsHovered] = useState(false);
    
    const useStyles = createUseStyles({
        Container: {
            display: 'flex',
            justifyContent: 'center',
        },
        Background: {
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            height: '48px',
            width: '90%',
            margin: '0px',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.15) 111.54%, rgba(255, 184, 0, 0.5) 211.54%)',
            border: '1px solid #F9F8F4',
            boxShadow: 'inset 0px 5px 5px rgba(255, 184, 0, 0.4), inset 0px -5px 10px rgba(249, 248, 244, 0.55)',
            borderRadius: '0px 0px 20px 20px',
        },
        Wrapper: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '100%',
            width: '8%',
            minWidth: '100px',
            backgroundColor: 'transparent',
            border: '0px',
            borderRadius: '0px 0px  20px 20px',
            '&:hover': {
                background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.2) 0%, #FFB800 100%)',
            },
        },
        LogoutIcon: {
            height: '18px',
            width: '18px',
        },
        LogoutBtn: {
            fontFamily: 'Paytone One',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '17px',
            letterSpacing: '0.2rem',
            color: '#FFB800',
        },
        LogoutBtnHovered: {
            fontFamily: 'Paytone One',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '17px',
            letterSpacing: '0.2rem',
            color: '#F4F9F9',
        }
    })

    const classes = useStyles();
    const dispatcher = useDispatch();
    const navigate = useNavigate();
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    const handleLogout = () => {
        // 確認是在登入狀態
        if(localStorage.getItem("user_id") != null) {
            dispatcher(loggedoutwithgoogle());
            const auth = getAuth();
            signOut(auth).then(() => {
                // 登出同時清除Storage中的資料
                window.localStorage.clear();
                window.sessionStorage.clear();
                console.log("successfully logout");
                navigate('/');
            }).catch((err) => {
                console.log("err: " + err.message);
            })
        } else {
            navigate('/');
        }
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Background}>
                <div className={classes.Wrapper}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleLogout}
                >
                    <img src={isHovered ? LogoutIconHovered : LogoutIcon} className={classes.LogoutIcon} alt="logout icon"/>
                    <div className={`${classes.LogoutBtn} ${isHovered ? classes.LogoutBtnHovered : ''}`}>Log Out</div>
                </div>
            </div>
        </div>
    )
}

export default CardBottom
