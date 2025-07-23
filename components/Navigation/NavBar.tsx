"use client";
import Link from "next/link";
import styles from "./NavBar.module.css";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();

  return (
    <nav className={styles.navbar}>
      <Link
        href={"/"}
        className={pathName === "/" ? styles.activeLink : styles.link}
      >
        Home
      </Link>{" "}
      |{" "}
      <Link
        href={"/events"}
        className={pathName === "/events" ? styles.activeLink : styles.link}
      >
        Events
      </Link>{" "}
      |{" "}
      <Link
        href={"/artists"}
        className={pathName === "/artists" ? styles.activeLink : styles.link}
      >
        Artists
      </Link>{" "}
      |{" "}
      <Link
        href={"/artists/directory"}
        className={
          pathName === "/artists/directory" ? styles.activeLink : styles.link
        }
      >
        Artists Directory
      </Link>{" "}
      |{" "}
      <Link
        href={"/favorites"}
        className={pathName === "/favorites" ? styles.activeLink : styles.link}
      >
        Favorites
      </Link>{" "}
      |{" "}
      <Link
        href={"/about"}
        className={pathName === "/about" ? styles.activeLink : styles.link}
      >
        About
      </Link>
    </nav>
  );
}
