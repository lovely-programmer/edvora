import Image from "next/image";
import styles from "../styles/Card.module.css";

function Card({ nearestRide, prevRide, upComingRide }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <Image
            src="/img/image 1.png"
            alt=""
            width={296}
            height={148}
            objectFit="contain"
          />
        </div>

        <div className={styles.location}>
          <span>
            Ride id: 00{nearestRide?.id || prevRide?.id || upComingRide?.id}
          </span>
          <span>
            Origin station:{" "}
            {nearestRide?.origin_station_code ||
              prevRide?.origin_station_code ||
              upComingRide?.origin_station_code}
          </span>
          <span>
            station_path : [
            {nearestRide?.station_path.join(", ") ||
              prevRide?.station_path.join(", ") ||
              upComingRide?.station_path.join(", ")}
            ]
          </span>
          <span>
            Date : {nearestRide?.date || prevRide?.date || upComingRide?.date}
          </span>
          <span>Distance : {nearestRide?.distance}</span>
        </div>

        <div className={styles.place}>
          <span>
            {nearestRide?.city || prevRide?.city || upComingRide?.city}
          </span>
          <span>
            {nearestRide?.state || prevRide?.state || upComingRide?.state}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
