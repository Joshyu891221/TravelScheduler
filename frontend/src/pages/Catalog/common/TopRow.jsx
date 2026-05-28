import Sign from './../../../assets/TopRow/sign.png'
import { createUseStyles } from 'react-jss'

const TopRow = () => {
    
    const useStyles = createUseStyles({
        Container: {
            display: 'flex',
            justifyContent: 'center',
            height: '130px',
        },
        TopLine: {
            position: 'absolute',
            width: '90%',
            height: '33px',
            top: '20px',
            background: 'linear-gradient(90deg, rgba(255, 247, 227, 0.46) 10%, #FFB800 100%)',
            backdropFilter: 'blur(25px)',
            /* Note: backdrop-filter has minimal browser support */
            borderRadius: '50px',
        },
        Sign: {
            position: 'absolute',
            top: '20px',
            left: '5%',
        },
        Text: {
            height: '15px',
            fontFamily: "'Paytone One', serif",
            position: 'absolute',
            top: '25px',
            right: '10%',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            /* identical to box height */
            letterSpacing: '0.15em',
            color: '#F9F8F4',
            textShadow: '0px 1px 4px rgba(210, 188, 131, 0.15)',
        },
    })

    const classes = useStyles();

    return (
        <div className={classes.Container}>
            <div className={classes.TopLine}/>
            <img src={Sign} className={classes.Sign} alt="sign"/>
            <div className={classes.Text}>Travel  Scheduler</div>
        </div>
    )
}

export default TopRow
