import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useDispatch } from 'react-redux'
import { joingroup, kickgroup, deletegroup } from './../../../../../actions/groupAction.js'
import GroupMark from './../../../../../assets/GroupList/groupMark.png'
import JoinIcon from './../../../../../assets/GroupDetails/joinBtn.png'
import KickIcon from './../../../../../assets/GroupDetails/kickIcon.png'
import KickDialog from './KickDialog.jsx'
import DeleteDialog from './DeleteDialog.jsx'

const GroupDetails = ({group_id, group_name, group_creator_name, group_peoplenum, members, handleClose}) => {

    const useStyles = createUseStyles({
        Container: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
        },
        Overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            zIndex: 1000,
        },
        Dialog: {
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // top: '15%',
            // left: '10%',
            width: '80%',
            height: '80%',
            maxHeight: '468px',
            zIndex: 1001,
            background: 'linear-gradient(180deg, rgba(249, 249, 244) 0%, rgba(241, 238, 230) 100%)',
            border: '0.5px solid #F9F8F4',
            boxShadow: 'inset 1px 1px 1px rgba(244, 249, 249, 0.55)',
            borderRadius: '10px',
            paddingTop: '10px',
            paddingBottom: '10px',
        },
        InfoWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        GroupMark: {
            width: '30px',
            height: '30px',
            marginRight: '10px',
        },
        GroupName: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.15em',
            color: '#FFB800',
        },
        DetailedInfo: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            /* identical to box height */
            letterSpacing: '0.15em',
            color: 'rgba(152, 152, 152, 0.6)',
        },
        CreateMemberWrapper: {
            display: 'flex',
            width: '82%',
            paddingLeft: '4%',
            paddingRight: '4%',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '38px',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.25) 0%, rgba(255, 184, 0, 0.6) 100%)',
            mixBlendMode: 'normal',
            borderRadius: '5px',
        },
        GroupMemberText: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '13px',
            lineHeight: '18px',
            letterSpacing: '0.15em',
            color: '#F9F8F4',
            textShadow: '0px 1px 4px rgba(210, 188, 131, 0.15)',
        },
        JoinWrapper: {
            display: 'flex',
            height: '38px',
            width: '90%',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.08) 0%, rgba(255, 184, 0, 0.2) 100%)',
            borderRadius: '5px',
            marginTop: '5px',
            marginBottom: '2px',
        },
        JoinInput: {
            width: '90%',
            height: '70%',
            border: '0px',
            background: 'transparent',
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '15px',
            letterSpacing: '0.1rem',
            color: '#FFB800',
            textAlign: 'center',
            paddingLeft: '10px',
            '&:focus': {
                border: '0px',
                outline: 'none',
            },
            '&::placeholder': {
                color: '#FFB800',
            },
        },
        JoinIcon: {
            width: '30px',
            height: '30px',
            marginRight: '10px',
        },
        MemberList: {
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '208px',
            width: '90%',
        },
        MemberWrapper: {
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            width: '100%',
            height: '50px',
            background: 'rgba(255, 184, 0, 0.1)',
            borderRadius: '5px',
            paddingLeft: '15px',
            marginTop: '2px',
        },
        MemberInfoWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'left',
            paddingLeft: '15px',
        },
        MemberName: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '17px',
            letterSpacing: '0.15em',
            color: '#FFB800',
        },
        MemberEmail: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '17px',
            /* identical to box height */
            letterSpacing: '0.15em',
            color: 'rgba(152, 152, 152, 0.6)',
        },
        CopyGroupIdBtn: {
            width: '90%',
            height: '45px',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.6) 0%, #FFB800 100%)',
            borderRadius: '5px',
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
            marginTop: '10px',
        },
        DeleteBtn: {
            width: '90%',
            height: '45px',
            background: 'linear-gradient(180deg, rgba(255, 61, 0, 0.6) 0%, #FF3D00 100%)',
            borderRadius: '5px',
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
            marginTop: '10px',
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
            border: '0px',
            marginTop: '10px',
        }
    })

    const classes = useStyles();
    const dispatcher = useDispatch();
    const [newMemerId, setNewMemberId] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleInputChanged = (e) => {
        setNewMemberId(e.target.value);
    }

    const handleOpenDialog = (memberId) => {
        setOpenDialog((prevState) => ({
            ...prevState,
            [memberId]: true,
        }));
    }

    const handleCloseDialog = (memberId) => {
        setOpenDialog((prevState) => ({
            ...prevState,
            [memberId]: false,
        }));
    }

    const handleJoin = () => {
        if(newMemerId.length != 0) {
            dispatcher(joingroup(newMemerId, group_id));
        }
    }

    const handleKick = (memberId) => {
        dispatcher(kickgroup(memberId, group_id));
    }

    const handleDelete = (group_id) => {
        dispatcher(deletegroup(group_id));
    }

    const copyGroupId = () => {
        navigator.clipboard.writeText(group_id).then(() => {
            console.log("write to clipboard successfully");
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Overlay} onClick={handleClose}></div>
            <div className={classes.Dialog}>
                <div className={classes.InfoWrapper}>
                    <img src={GroupMark} className={classes.GroupMark}/>
                    <div>
                        <div className={classes.GroupName}>{group_name}</div>
                        <div className={classes.DetailedInfo}>{group_creator_name}, {members[0].length} people</div>
                    </div>
                </div>
                <div className={classes.JoinWrapper}>
                    <input className={classes.JoinInput} type="text" value={newMemerId} placeholder="new member's userId" onChange={handleInputChanged}/>
                    <img className={classes.JoinIcon} src={JoinIcon} onClick={handleJoin} alt="join member icon"/>
                </div>
                <div className={classes.CreateMemberWrapper}>
                    <div className={classes.GroupMemberText}>Group Members</div>
                </div>
                <div className={classes.MemberList}>
                    {members[0].map((member) => {
                        return (
                            <div className={classes.MemberWrapper} key={member.user_id}>
                                <img className={classes.KickIcon} src={KickIcon} alt="kick icon" onClick={() => handleOpenDialog(member.user_id)}/>
                                <div className={classes.MemberInfoWrapper}>
                                    <div className={classes.MemberName}>{member.username}</div>
                                    <div className={classes.MemberEmail}>{member.email}</div>
                                </div>
                                { openDialog[member.user_id] ? 
                                    <KickDialog
                                        user_id={member.user_id}
                                        username={member.username}
                                        group_name={group_name}
                                        handleCloseDialog={() => handleCloseDialog(member.user_id)}
                                        handleKick={() => handleKick(member.user_id)}
                                    /> : <></>}
                            </div>
                        )
                    })}
                </div>
                <button className={classes.CopyGroupIdBtn} onClick={copyGroupId}>Copy GroupID</button>
                <button className={classes.DeleteBtn} onClick={() => setOpenDeleteDialog(true)}>Delete Group</button>
                <button className={classes.CancelBtn} onClick={handleClose}>Cancel</button>
                { openDeleteDialog ? <DeleteDialog
                    group_id={group_id}
                    group_name={group_name}
                    handleDelete={() => handleDelete(group_id)}
                    handleCloseDialog={() => setOpenDeleteDialog(false)}
                /> : <></>
                }
            </div>
        </div>
    )
}

export default GroupDetails
