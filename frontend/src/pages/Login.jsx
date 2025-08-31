import "./RegisterPage.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../store/actions/authAction";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loginError} = useSelector(state => state.auth)

  const submitForm = (data) => {
    console.log("Login Data:", data);

    dispatch(loginUserAction(data));
    
    navigate('/')

    reset();
  };



  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit(submitForm)}>
        <h2 className="form-title">Welcome Back</h2>

        <input
          type="text"
          placeholder="Username or Email"
          {...register("identifier", { required: true })}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <div className="auth-error">{loginError}</div>

        <button type="submit" className="register-btn">
          Log In
        </button>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
