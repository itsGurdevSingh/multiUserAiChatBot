import axios from "../../api/axiosConfig"
import { loadUser, setLoading, setLoginError, setRegisterError, setSessionError } from "../reducers/authSlice"


export const registerUserAction = (userData) => async (dispatchEvent) => {

    try {
        dispatchEvent(setLoading(true))

        const res = await axios.post('/auth/register', userData, { withCredentials: true })
        const user = res.data?.user
        dispatchEvent(setRegisterError(null))

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

        const user = res.data?.user
        dispatchEvent(setLoginError(null))
        dispatchEvent(loadUser(user))
    } catch (error) {

        // console.log(error)
        dispatchEvent(setLoginError(error.response.data.error))
        dispatchEvent(setLoading(false))

    }
}
export const isUserLoginAction = () => async (dispatchEvent) => {

    try {

        dispatchEvent(setLoading(true))
        const res = await axios.get('/auth/verify', { withCredentials: true })
        const user = res.data?.user
        dispatchEvent(setSessionError(null))
        dispatchEvent(loadUser(user))

    } catch (error) {
        dispatchEvent(setLoading(false));
        dispatchEvent(setSessionError(error.response.data.error))
        // console.log(error)

    }
}


