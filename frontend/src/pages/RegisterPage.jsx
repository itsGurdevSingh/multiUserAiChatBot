import "./RegisterPage.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../store/actions/authAction";

const RegisterPage = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {registerError} = useSelector(state => state.auth)



  const submitForm = (data) => {
    // console.log("Form Data:", data);
    dispatch(registerUserAction(data));
      navigate("/");

    reset(); // optional: clears form after submit
  };



  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit(submitForm)}>
        <h2 className="form-title">Register</h2>

        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />

        <input
          type="text"
          placeholder="First Name"
          {...register("firstName", { required: true })}
        />

        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: true })}
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <div className="auth-error">{registerError}</div>

        <button type="submit" className="register-btn">
          Sign Up
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
