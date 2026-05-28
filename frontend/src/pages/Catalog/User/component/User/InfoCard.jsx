import { useDispatch, useSelector } from 'react-redux'
import { createUseStyles } from 'react-jss'
import UserIcon from './../../../../../assets/InfoCard/userIdIcon.png'
import EmailIcon from './../../../../../assets/InfoCard/emailIcon.png'
import CopyIcon from './../../../../../assets/copy.png'

const InfoCard = () => {

    const useStyles = createUseStyles({
        Container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        Card: {
            // position: absolute;
            display: 'flex',
            justifyContent: 'center',
            width: '90%',
            height: '196px',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.3) 0%, #FFB800 100%)',
            border: '0.5px solid #F4F9F9',
            borderBottomWidth: '0px',
            boxShadow: 'inset 0px -10px 10px rgba(255, 184, 0, 0.4), inset 1px 1px 1px rgba(255, 247, 227, 0.55)',
            borderRadius: '20px 20px 0px 0px',
        },
        Info: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingTop: '85px',
            marginBottom: '10px',
        },
        HstickerWrapper: {
            position: 'absolute',
            top: '82px',
            width: '96px',
            height: '96px',
            padding: '10px',
            borderRadius: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(180deg, rgba(255, 247, 227, 0.276) 0%, rgba(255, 247, 227, 0.6) 100%)',
            border: '0.5px solid rgba(245, 245, 245, 0.6)',
            boxShadow: '0px 1px 4px rgba(210, 188, 131, 0.15), inset -1px -1px 5px rgba(210, 188, 131, 0.15)',
            backdropFilter: 'blur(30px)',
        },
        Hsticker: {
            borderRadius: '100px',
        },
        UsernameWrapper: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px',
            width: 'auto',
            paddingLeft: '25px',
            paddingRight: '25px',
            height: '39px',
            alignItems: 'center',
            background: 'linear-gradient(180deg, rgba(255, 247, 227, 0.93) 0%, #FFFAED 100%)',
            border: '0.5px solid #F9F8F4',
            boxShadow: '0px 2px 4px rgba(210, 188, 131, 0.15), inset 0px -8px 8px rgba(249, 248, 244, 0.9)',
            borderRadius: '30px',
        },
        ConnectWay: {
            width: '100%',
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
        },
        Username: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            /* identical to box height */
            letterSpacing: '0.15em',
            color: '#FFB800',
        },
        IdandMail: {
            textAlign: 'center',
            fontFamily: "'Paytone One', serif",
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '17px',
            /* identical to box height */
            letterSpacing: '0.15em',
            color: '#F9F8F4',
            textShadow: '0px 1px 4px rgba(210, 188, 131, 0.15)',
            marginRight: '5px',
        }
    })

    const classes = useStyles();
    const displayName = useSelector(state => state.loginReducer.displayName);
    const email = useSelector(state => state.loginReducer.email);
    const photoURL = useSelector(state => state.loginReducer.photoURL);
    const userId = useSelector(state => state.loginReducer.userId);

    const copyUserId = () => {
        navigator.clipboard.writeText(userId).then(() => {
            console.log("write to clipboard successfully");
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Card}>
                <div className={classes.Info}>
                    <div className={classes.HstickerWrapper}>
                        <img src={photoURL} className={classes.Hsticker} alt="head sticker"/>
                    </div>
                    <div className={classes.UsernameWrapper}>
                        <div className={classes.Username}>{displayName}</div>
                    </div>
                    <div className={classes.ConnectWay}>
                        <img src={EmailIcon} alt="email icon"/>
                        <div className={classes.IdandMail}>{email}</div>
                    </div>
                    <div className={classes.ConnectWay}>
                        <img src={UserIcon} alt="user icon"/>
                        <div className={classes.IdandMail}>copy userId</div>
                        <img src={CopyIcon} alt="CopyIcon" onClick={copyUserId}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard;
