import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../AuthLayout/Layout";
import FormField from "../../../components/formField/formField";
import "../Authenication.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // React Router history hook
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData.email + " " + formData.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in email and password");
      return;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Invalid email format");
      return;
    } else {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://easyinvoiceapi.onrender.com/api/auth/login",
          formData
        );
        setLoading(false);

        if (response.data.success) {
          console.log(
            "Response:",
            response.data,
            response.status,
            response.data.token
          );
          navigate("/dashboard");
        }
      } catch (error) {
        setLoading(false);

        if (error.response) {
          console.log(error.response);
          console.log("server respond");
          setErrorMessage("Login failed: server respond Error");
        } else if (error.request) {
          console.log("network error");
          setErrorMessage("Login failed: network error");
        } else {
          console.log("Error:", error);
          setErrorMessage("Error: " + error.message);
        }
      }
    }
  };

  return (
    <Layout className="form-layout">
      <div className="form-control">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <FormField
              htmlFor={"email"}
              type={"email"}
              inputName={"email"}
              placeholder={"Email"}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* Password Input */}
          <div>
            <FormField
              htmlFor={"password"}
              type={"password"}
              inputName={"password"}
              placeholder={"Password"}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {/* Feedback messages */}
          <div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>

          {/* Submit button */}
          <button type="submit" className="submit-btn">
            {loading ? "Sign In..." : "Sign In"}
          </button>
        </form>

        {/* Registration link */}
        <button className="register-btn">
          <Link to="/register">Create Account</Link>
        </button>
      </div>
      <div className="forgetPassword-link">
        <Link to="/forgetPassWord">Forget Password?</Link>
      </div>
    </Layout>
  );
};

export default LoginForm;
