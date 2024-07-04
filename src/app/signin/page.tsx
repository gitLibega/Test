"use client"
import styles from "@/app/signin/page.module.css";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";

import { getTokens, getUser } from "@/store/features/userSlice";
import { useAppDispatch } from "@/hooks";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  //функция логина, которая будет делать запрос на сервер
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData, //предыдущее состояние
        [name]: value,
      };
    });
  }
  //функция отправки
  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await Promise.all([
        dispatch(getTokens(formData)).unwrap(),
        dispatch(getUser(formData)).unwrap(),
      ]);
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
            <a href="../">
              <div className={styles.modalLogo}>
                <Image
                  width={140}
                  height={21}
                  src="/img/logo_modal.png"
                  alt="Логотип"
                />
              </div>
            </a>
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="email"
              placeholder="Почта"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className={classNames(styles.modalInput, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
            />
            <button className={styles.modalBtnEnter} onClick={handleSubmit}>
              Войти
            </button>
            <button className={styles.modalBtnSignup}>
              <Link href="/signup">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
