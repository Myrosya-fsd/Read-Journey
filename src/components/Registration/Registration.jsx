import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
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

const Registration = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Дані, що надсилаються:", data); // Перевірка даних
    try {
      const response = await fetch(
        "https://readjourney.b.goit.study/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Відповідь бекенду:", result); // Перевірка відповіді

      if (!response.ok) {
        alert(result.message || "Registration error");
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("refreshToken", result.refreshToken);

      reset();
      navigate("/");
    } catch (error) {
      console.error("Помилка серверу:", error);
      alert("Server error. Try again later.");
    }
  };

  const setActiveClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

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
            <label htmlFor="user-name" className={styles.label}>
              Name:
            </label>
            <input
              className={styles.contactBlockInput}
              id="user-name"
              type="text"
              placeholder=""
              {...register("name")}
              autoComplete="name"
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>
          <div className={styles.wrapper}>
            <label htmlFor="user-email" className={styles.label}>
              Mail:
            </label>
            <input
              className={`${styles.contactBlockInput} ${styles.contactBlockInput2}`}
              id="user-email"
              type="email"
              placeholder=""
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
              placeholder=""
              {...register("password")}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.buttonBox}>
            <button className={styles.btn} type="submit" disabled={!isValid}>
              Registration
            </button>

            <a href="#" className={styles.buttonLink}>
              Already have an account?
            </a>
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
