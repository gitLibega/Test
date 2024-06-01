"use client"; //Все хуки, мы используем только в клиентских комп-ах, поэтому в верху всей страницы, прописываем директиву 'use client'
import { useState } from "react";
import styles from "./Navigation.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  const [isOpened, setIsOpened] = useState<boolean>(false); //Кода работаем с состоянием, то указываем тип данных (ситакс. <тип данных>)
  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Link href="/">
          <Image
            className={styles.logoImage}
            src="/img/logo.png"
            alt="Логотип скайпро музыка"
            width={133}
            height={17}
          />
        </Link>
      </div>
      {/* {На кнопку навигации навешиваем обработчик событий.} */}
      <div
        onClick={() => setIsOpened((prev) => !prev)}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpened && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Мой плейлист
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="/signin" className={styles.menuLink}>
                Войти
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
