import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import api from "./api";

function Navbar() {
  const user = api.user;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <h2>Edvora</h2>
        </div>

        <div className={styles.user}>
          <div className={styles.username}>{user.name}</div>
          <div>
            <Image src={user.img} alt="" width={44} height={44} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
