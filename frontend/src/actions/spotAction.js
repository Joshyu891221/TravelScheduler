import axios from 'axios';

export const getUserSpots = () => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.get(`${hostUrl}/api/spot/get1`, { withCredentials: true })
            .then((res) => (res = res.data))
            .then((res) => {
                if (res.success === true) {
                    dispatch({
                        type: "GetUserSpots",
                        payload: res.data,
                    });
                }
            })
            .catch((err) => {
                console.log("error: " + err.message);
            });
    };
};

export const getTravelSpots = (travelId) => {
    return async (dispatch) => {
            const hostUrl = import.meta.env.VITE_HOST_URL;
            await axios.get(`${hostUrl}/api/spot/get2`,{
                headers: {
                    travel_id: travelId
                },
                withCredentials: true
            })
            .then((res) => (res = res.data))
            .then((res) => {
                if (res.success === true) {
                    dispatch({
                        type: "GetTravelSpot",
                        payload: res.data,
                    });
                }
            })
            .catch((err) => {
                console.log("error: " + err.message);
            });
    };
};

export const createspot = (spotName, spotLatitude, spotLongitude, spotLocation, spotRank, spotOpenhour, spotTagName, spotArriveId, spotStartTime, spotArriveTime, travelId) => {
    return (dispatch) => {
        console.log("CREATE:",spotName);
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.post(`${hostUrl}/api/spot/create`,
            {
                spot_name: spotName,
                spot_latitude: spotLatitude,
                spot_longtitude: spotLongitude,
                spot_location: spotLocation,
                spot_rank: spotRank,
                spot_openhour: spotOpenhour,
                spot_description: "hello",
                spot_tag_name: spotTagName,
                spot_tag_color: "purple",
                arrive_id: spotArriveId,
                spot_transportation: "null",
                spot_start_time: spotStartTime,
                spot_arrive_time: spotArriveTime,
                travel_id: travelId
            },
            { withCredentials: true }
        )
        .then((res) => (res = res.data))
        .then((res) => {
            if (res.success === true) {
                dispatch(getTravelSpots(travelId)); // Wait for getTravelSpots to complete
            }
        })
        .catch ((err) => {
            console.log("error: " + err.message);
        })
    };
};


export const updatespot = (hasId, spotId, spotDescription, spotTagName, spotTransportation, spotStartTime, spotArriveTime, spotArriveId, spotTravelId,spotStar) => {
   console.log("UPDATE:",hasId);
    console.log(spotStartTime);
    console.log(spotArriveTime);
    console.log(spotArriveId);

    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        console.log("UPDATE ACTION:",spotStar);
        axios.put(
            `${hostUrl}/api/spot/update`,
            {
                has_id: hasId,
                spot_id: spotId,
                spot_description: spotDescription,
                spot_tag_name: spotTagName,
                spot_transportation: spotTransportation,
                spot_start_time: spotStartTime,
                spot_arrive_time: spotArriveTime,
                arrive_id: spotArriveId,
                travel_id: spotTravelId,
                spot_star: spotStar,
            },
            { withCredentials: true }
        )
            .then((res) => (res = res.data))
            .then((res) => {
                if (res.success === true) {
                    dispatch(getTravelSpots(spotTravelId));
                }
            })
            .catch((err) => {
                console.log("error: " + err.message);
            });
    };
};

export const deletespot = (hasId, travelId) => {
  return (dispatch) => {
      const hostUrl = import.meta.env.VITE_HOST_URL;
      axios.delete(
              `${hostUrl}/api/spot/delete`,
              {
                  data: {
                      has_id: hasId,
                  },
              },
              { withCredentials: true }
          )
          .then((res) => (res = res.data))
          .then((res) => {
              if (res.success === true) {
                  dispatch(getTravelSpots(travelId));
              }
          })
          .catch((err) => {
              console.log("error: " + err.message);
          });
  };
};