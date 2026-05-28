import axios from "axios";

export const getgroup = () => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.get(`${hostUrl}/api/group/`, { withCredentials: true })
            .then((res) => (res = res.data))
            .then((res) => {
                if (res.success === true) {
                    dispatch({
                        type: "GetGroup",
                        payload: res.data.groups,
                    });
                }
            })
            .catch((err) => {
                console.log("error: " + err.message);
            });
    };
};

export const creategroup = (groupName, groupDescription) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.post(
                `${hostUrl}/api/group/create`,
                {
                    group_name: groupName,
                    group_description: groupDescription,
                },
                { withCredentials: true }
            )
            .then((res) => (res = res.data))
            .then((res) => {
                if (res.success === true) {
                    dispatch(getgroup());
                }
            })
            .catch((err) => {
                console.log("error: " + err.message);
            });
    };
};

export const updategroup = (groupId, groupName, groupDescription) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.put(
                `${hostUrl}/api/group/update`,
                {
                    group_id: groupId,
                    group_name: groupName,
                    group_description: groupDescription,
                },
                { withCredentials: true }
            )
            .then((res) => (res = res.data))
            .then((res) => {
                if (res.success === true) {
                    dispatch(getgroup());
                }
            })
            .catch((err) => {
                console.log("error: " + err.message);
            });
    };
};

export const deletegroup = (groupId) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.delete(
                `${hostUrl}/api/group/delete`,
                {
                    data: {
                        group_id: groupId,
                    },
                },
                { withCredentials: true }
            )
            .then((res) => (res = res.data))
            .then((res) => {
                if (res.success === true) {
                    dispatch(getgroup());
                }
            })
            .catch((err) => {
                console.log("error: " + err.message);
            });
    };
};

export const joingroup = (memberId, groupId) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.post(
                `${hostUrl}/api/group/join`,
                {
                    user_id: memberId,
                    group_id: groupId,
                },
                { withCredentials: true }
            )
            .then((res) => (res = res.data))
            .then((res) => {
                if (res.success === true) {
                    dispatch(getgroup());
                }
            })
            .catch((err) => {
                console.log("error: " + err.message);
            });
    };
};

export const kickgroup = (memberId, groupId) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.delete(
                `${hostUrl}/api/group/kick`,
                {
                    data: {
                        user_id: memberId,
                        group_id: groupId,
                    }
                },
                { withCredentials: true }
            )
            .then((res) => (res = res.data))
            .then((res) => {
                if (res.success === true) {
                    dispatch(getgroup());
                }
            })
            .catch((err) => {
                console.log("error: " + err.message);
            });
    };
};
