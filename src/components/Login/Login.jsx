import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import here1x from "../../../public/img/iPhone 15 Black-1х.png";
import here2x from "../../../public/img/iPhone 15 Black-2х.png";
import styles from "./Login.module.css";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format"),

  password: Yup.string()
    .required("Password is required")
    .min(7, "Password must be at least 7 symbols"),
});

const setActiveClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

const Login = () => {
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

  const onSubmit = (data) => {
    console.log("Login data:", data);

    reset();

    navigate("/");
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.login}>
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
            <label htmlFor="user-email" className={styles.label}>
              Mail:
            </label>
            <input
              className={`${styles.contactBlockInput} ${styles.contactBlockInput2}`}
              id="user-email"
              type="email"
              placeholder="Your@email.com"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.wrapper}>
            <label htmlFor="user-password" className={styles.label}>
              Password:
            </label>
            <input
              className={`${styles.contactBlockInput} ${styles.contactBlockInput3}`}
              id="user-password"
              type="password"
              placeholder="Yourpasswordhere"
              {...register("password")}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.buttonBox}>
            <button className={styles.btn} type="submit" disabled={!isValid}>
              Log in
            </button>
            <Link to="/registration" className={styles.buttonLink}>
              Don’t have an account?
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

export default Login;
