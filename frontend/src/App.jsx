import React, { useEffect } from 'react'
import MainRoutes from './routes/MainRoutes'
import { useDispatch} from 'react-redux'
import { isUserLoginAction } from './store/actions/authAction'
import useApplyTheme from "./hooks/useApplyTheme";
import ThemeButton from "./components/helper/ThemeButton";

const App = () => {
const dispatch = useDispatch()
useApplyTheme()

  useEffect(() => {
    dispatch(isUserLoginAction())
  }, [])
  return (
    <div>
      <MainRoutes/>
    </div>
  )
}

export default App