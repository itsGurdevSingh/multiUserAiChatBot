import axios from "../../api/axiosConfig"
import { clearErrors, loadUser, setLoading, setLoginError, setRegisterError, setSessionError } from "../reducers/authSlice"


export const registerUserAction = (userData) => async (dispatchEvent) => {

    try {
        dispatchEvent(setLoading(true))

        const res = await axios.post('/auth/register', userData, { withCredentials: true })
        const user = res.data?.user
        dispatchEvent(clearErrors())

        dispatchEvent(loadUser(user))
    } catch (error) {

        // console.log(error.message)
        dispatchEvent(setRegisterError(error.response.data.error))
        dispatchEvent(setLoading(false))

    }
}
export const loginUserAction = (userData) => async (dispatchEvent) => {

    try {
        dispatchEvent(setLoading(true))

        const res = await axios.post('/auth/login', userData, { withCredentials: true })
        // console.log(res)
        const user = res.data?.user
        dispatchEvent(clearErrors())
        dispatchEvent(loadUser(user))
    } catch (error) {

        // console.log(error)
        dispatchEvent(setLoginError(error.response.data.error))
        dispatchEvent(setLoading(false))

    }
}
export const isUserLoginAction = () => async (dispatchEvent) => {
    try {
        dispatchEvent(setLoading(true));

        // ✅ Check if cookie exists before calling API
        const authToken = Cookies.get("authToken");
        if (!authToken) {
            dispatchEvent(setLoading(false));
            dispatchEvent(setSessionError("No auth token found"));
            return; // exit early, don’t waste an API call
        }

        // ✅ Token exists → now verify with backend
        const res = await axios.get("/auth/verify", { withCredentials: true });
        const user = res.data?.user;

        dispatchEvent(clearErrors())
        dispatchEvent(loadUser(user));
    } catch (error) {
        dispatchEvent(setLoading(false));
        dispatchEvent(setSessionError(error.response?.data?.error || "Session expired"));
    }
};


