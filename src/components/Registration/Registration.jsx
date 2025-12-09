import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api, { setAuthHeader } from "../../services/api";
import styles from "./Registration.module.css";
import here1x from "../../../public/img/iPhone 15 Black-1х.png";
import here2x from "../../../public/img/iPhone 15 Black-2х.png";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 symbols"),
  email: Yup.string()
    .required("Email is required")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(7, "Password must be at least 7 symbols"),
});

const setActiveClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

const Registration = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.post("/users/signup", formData);

      setAuthHeader(data.token);
      localStorage.setItem("token", data.token);

      reset();

      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);

      if (err.response?.status === 409) {
        alert("User already exists. Please log in.");
      } else {
        alert("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className={styles.registrationWrapper}>
      <div className={styles.registration}>
        <NavLink
          to="/"
          end
          className={`${setActiveClass} ${styles.logo}`}
          title="Home"
        >
          <svg className={`${styles.icon} ${styles.iconLogo1}`}>
            <use xlinkHref="/symbol-defs.svg#icon-Logo-1" />
          </svg>
          <svg className={`${styles.icon} ${styles.iconLogo2}`}>
            <use xlinkHref="/symbol-defs.svg#icon-read-journey-1" />
          </svg>
        </NavLink>

        <h1 className={styles.title}>
          Expand your mind, reading
          <span className={styles.titleSpan}> a book</span>
        </h1>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.wrapper}>
            <div className={styles.wrapperTwo}>
              <label htmlFor="user-name" className={styles.label}>
                Name:
              </label>
              <input
                id="user-name"
                type="text"
                placeholder="Ilona Ratushniak"
                className={styles.contactBlockInput}
                {...register("name")}
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.wrapper}>
            <div className={styles.wrapperTwo}>
              <label htmlFor="user-email" className={styles.label}>
                Mail:
              </label>
              <input
                id="user-email"
                type="email"
                placeholder="Your@email.com"
                className={`${styles.contactBlockInput} ${styles.contactBlockInput2}`}
                {...register("email")}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.wrapper}>
            <div className={styles.wrapperTwo}>
              <label htmlFor="user-password" className={styles.label}>
                Password:
              </label>
              <input
                id="user-password"
                type="password"
                placeholder="Yourpasswordhere"
                className={`${styles.contactBlockInput} ${styles.contactBlockInput3}`}
                {...register("password")}
                autoComplete="new-password"
              />
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.buttonBox}>
            <button className={styles.btn} type="submit" disabled={!isValid}>
              Registration
            </button>
            <Link to="/login" className={styles.buttonLink}>
              Already have an account?
            </Link>
          </div>
        </form>
      </div>

      <div className={styles.phofoBox}>
        <img
          className={styles.img}
          src={here1x}
          srcSet={`${here1x} 1x, ${here2x} 2x`}
          alt="Students learning languages"
        />
      </div>
    </div>
  );
};

export default Registration;
