import Link from "next/link"
import styles from "./SideBar.module.css"
import Image from "next/image"

export default function SideBar() {
  return (
    <div className={styles.mainSidebar}>
            <div className={styles.sidebarPersonal}>
              <p className={styles.sidebarPersonalName}>Sergey.Ivanov</p>
              <div className={styles.sidebarIcon}>
                <svg>
                  <use href="/img/icon/sprite.svg#logout" />
                </svg>
              </div>
            </div>
            <div className={styles.sidebarBlock}>
              <div className={styles.sidebarList}>
                <div className={styles.sidebarItem}>
                  <Link className={styles.sidebarLink} href="/tracks/category/1">
                    <Image
                      className={styles.sidebarImg}
                      src="/img/playlist01.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </Link>
                </div>
                <div className={styles.sidebarItem}>
                  <Link className={styles.sidebarLink} href="/tracks/category/2">
                    <Image
                      className={styles.sidebarImg}
                      src="/img/playlist02.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </Link>
                </div>
                <div className={styles.sidebarItem}>
                  <Link className={styles.sidebarLink} href="/tracks/category/3">
                    <Image
                      className={styles.sidebarImg}
                      src="/img/playlist03.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
  )
}