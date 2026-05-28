import { createUseStyles } from 'react-jss'
import ExclamationMark from './../../../../../assets/exclamationMark.png'

const DeleteDialog = ({group_id, group_name, handleDelete, handleCloseDialog}) => {

    const useStyles = createUseStyles({
        Container: {
            position: 'fixed',
            width: '70%',
            height: '20%',
            top: '40%',
            backgroundColor: '#FFFFFF',
            left: '15%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 1003,
            borderRadius: '10px',
        },
        Overlay: {
            zIndex: 1002,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
        Mark: {
            width: '25px',
            height: '25px',
        },
        Text: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            textAlign: 'center',
            letterSpacing: '0.1em',
            color: '#FFB800',
        },
        BtnsWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '70%',
        },
        DeleteBtn: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '70px',
            height: '30px',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.6) 0%, #FFB800 100%)',
            borderRadius: '10px',
            border: '0px',
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '11px',
            lineHeight: '15px',
            textAlign: 'center',
            letterSpacing: '0.1em',
            color: '#F9F8F4',
        },
        CancelBtn: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '70px',
            height: '30px',
            borderRadius: '10px',
            border: '2px solid #FFB800',
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '11px',
            lineHeight: '15px',
            textAlign: 'center',
            letterSpacing: '0.1em',
            color: '#FFB800',
            backgroundColor: '#FFFFFF',
        }
    })

    const classes = useStyles();

        return (
            <div>
                <div className={classes.Overlay} onClick={handleCloseDialog}></div>
                <div className={classes.Container}>
                    <img className={classes.Mark} src={ExclamationMark} alt="exclamation mark"/>
                    <div className={classes.Text}>Do you really want to delete group {group_name} ?</div>
                    <div className={classes.BtnsWrapper}>
                        <button className={classes.DeleteBtn} onClick={handleDelete}>Delete</button>
                        <button className={classes.CancelBtn} onClick={handleCloseDialog}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

export default DeleteDialog
