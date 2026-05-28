import axios from "axios";
axios.defaults.withCredentials = true;

export const loggedoutwithgoogle = () => ({
  type: "LoggedOutWithGoogle",
});

export const register = (displayName, email, photoURL) => {
  return async (dispatch) => {
    const hostUrl = import.meta.env.VITE_HOST_URL;
    axios
      .post(
        `${hostUrl}/api/user/register`,
        {
          username: displayName,
          email: email,
          photoURL: photoURL,
        },
        { withCredentials: true }
      )
      .then((res) => (res = res.data))
      .then((res) => {
        // 將user_id寫入localStorage
        if (res.success === true) {
          localStorage.setItem("user_id", res.data.user_id);
          dispatch({
            type: "Register",
            payload: {
              userId: res.data.user_id,
            },
          });
        }
      })
      .catch((err) => {
        console.log("error: " + err.message);
      });
  };
};

export const getUser = () => {
  return (dispatch) => {
    const hostUrl = import.meta.env.VITE_HOST_URL;
    axios
      .get(`${hostUrl}/api/user`, { withCredentials: true })
      .then((res) => (res = res.data))
      .then((res) => {
        if (res.success === true) {
          dispatch({
            type: "GetUser",
            payload: {
              userId: res.data.user_id,
              displayName: res.data.username,
              email: res.data.email,
              photoURL: res.data.photoURL,
            },
          });
        }
      })
      .catch((err) => {
        console.log("error: " + err.message);
      });
  };
};
