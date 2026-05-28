import axios from "axios";

export const gettravel = () => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.get(`${hostUrl}/api/travel/get1`, { withCredentials: true })
            .then(res => res = res.data)
            .then(res => {
                if (res.success === true) {
                    dispatch({
                        type: "GetTravels",
                        payload: res.data.travels
                    })
                }
            }).catch(err => {
                console.log('error: ' + err.message);
            })
    }
}

export const createtravel = (
    travelName,
    groupId,
    travelDate,
    travelDescription,
) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        groupId = groupId === "" ? null : groupId;
        axios.post(`${hostUrl}/api/travel/create`, {
            travel_name: travelName,
            group_id: groupId,
            travel_date: travelDate,
            travel_peoplenum: 1,
            travel_description: travelDescription,
            travel_done: 0,
        }, { withCredentials: true }).then(res => res = res.data)
            .then(res => {
                if (res.success === true) {
                    dispatch(gettravel());
                }
            }).catch(err => {
                console.log('error: ' + err.message);
            })
    }
}

export const edittravel = (travelId, travelName, travelDate, travelPeoplenum, travelDescription, travelDone, groupId) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        // const formattedDate = new Date(travelDate).toISOString().slice(0, 16);
        console.log(travelDate);
        axios.put(`${hostUrl}/api/travel/edit`, {
            travel_id: travelId,
            travel_name: travelName,
            travel_date: travelDate,
            travel_peoplenum: travelPeoplenum,
            travel_description: travelDescription,
            travel_done: travelDone,
            group_id: groupId,

        }, { withCredentials: true }).then(res => res = res.data)
            .then(res => {
                if (res.success === true) {
                    dispatch(gettravel());
                }
            }).catch(err => {
                console.log('error: ' + err.message);
            })
    }
}

export const deletetravel = (travelId) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.delete(`${hostUrl}/api/travel/delete`, {
            data: {
                travel_id: travelId,
            }
        }, { withCredentials: true }).then(res => res = res.data)
            .then(res => {
                if (res.success === true) {
                    dispatch(gettravel());
                }
            }).catch(err => {
                console.log('error: ' + err.message);
            })
    }
}
