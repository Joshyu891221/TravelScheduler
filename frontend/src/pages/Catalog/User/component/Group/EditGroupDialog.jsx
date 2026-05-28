import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { getgroup, updategroup } from './../../../../../actions/groupAction.js'
import { useDispatch } from 'react-redux'

const EditGroupDialog = ({ group_id, handleCloseDialog }) => {

    const useStyles = createUseStyles({
        Overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            zIndex: 1000,
        },
        Container: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        Dialog: {
            position: 'fixed',
            width: '80%',
            height: '32%',
            maxHeight: '215px',
            zIndex: 1001,
            background: 'linear-gradient(180deg, rgba(249, 249, 244) 0%, rgba(241, 238, 230) 100%)',
            border: '0.5px solid #F9F8F4',
            boxShadow: 'inset 1px 1px 1px rgba(244, 249, 249, 0.55)',
            borderRadius: '10px',
        },
        Title: {
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            height: '38px',
            width: '100%',
            paddingLeft: '12px',
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '13px',
            lineHeight: '18px',
            letterSpacing: '0.15em',
            color: '#FFFFFF',
            textShadow: '0px 1px 4px rgba(210, 188, 131, 0.3)',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.4) 0%, rgba(255, 184, 0, 0.8) 100%)',
            boxShadow: 'inset 0px -10px 10px rgba(255, 184, 0, 0.4)',
            borderRadius: '10px 10px 0px 0px',
        },
        Content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        },
        InputBox: {
            width: '90%',
            height: '45px',
            border: '0px',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.08) 0%, rgba(255, 184, 0, 0.2) 100%)',
            borderRadius: '10px',
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '15px',
            letterSpacing: '0.1rem',
            color: '#FFB800',
            textAlign: 'center',
            marginTop: '5%',
            '&:focus': {
                border: '0px',
                outline: 'none',
            },
            '&::placeholder': {
                color: '#FFB800',
            }
        },
        DoneBtn: {
            width: '90%',
            height: '45px',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.6) 0%, #FFB800 100%)',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '0px',
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            textAlign: 'center',
            letterSpacing: '0.15em',
            color: '#F5F5F5',
            textShadow: '0px 1px 4px rgba(210, 188, 131, 0.15)',
            marginTop: '5%',
            cursor: 'pointer',
        },
        CancelBtn: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            textAlign: 'center',
            letterSpacing: '0.15em',
            color: '#FFB800',
            marginTop: '5%',
            cursor: 'pointer',
        }
    })

    const classes = useStyles();
    const dispatcher = useDispatch();
    const [groupName, setGroupName] = useState("");

    const handleChange = (e) => {
        setGroupName(e.target.value);
    }

    const handleUpdate = () => {
        dispatcher(updategroup(group_id, groupName, ""));
        handleCloseDialog();
    };

    return (
        <div className={classes.Container}>
            <div className={classes.Overlay} onClick={handleCloseDialog}></div>
            <div className={classes.Dialog}>
                <div className={classes.Title}>Edit Group Name</div>
                <div className={classes.Content}>
                    <input className={classes.InputBox} type="text" placeholder="New Group Name" value={groupName} onChange={handleChange}/>
                    <button className={classes.DoneBtn} onClick={handleUpdate}>Done</button>
                    <div className={classes.CancelBtn} onClick={handleCloseDialog}>Cancel</div>
                </div>
            </div>
        </div>
    )
}

export default EditGroupDialog
