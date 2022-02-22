import Image from "next/image";
import styles from "../styles/Features.module.css";
import Card from "./Card";
import api from "./api";
import { useState, useEffect } from "react";

function Features() {
  const [nearRide, setNearRide] = useState(true);
  const [prevRide, setPrevRide] = useState(false);
  const [upComingRide, setUpComingRide] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const city = [];
  const state = [];

  api.nearestRide.forEach((near) => {
    state.push(near.state);
    city.push(near.city);
  });

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  useEffect(() => {
    setInterval(() => {
      setPreloader(false);
    }, 5000);
  });

  const newState = removeDuplicates(state);
  const newCity = removeDuplicates(city);

  const handleRide = (ride) => {
    if (ride === "near") {
      setNearRide(true);
      setPrevRide(false);
      setUpComingRide(false);
      setPreloader(true);
    } else if (ride === "upComing") {
      setNearRide(false);
      setPrevRide(false);
      setUpComingRide(true);
      setPreloader(true);
    } else if (ride === "prev") {
      setNearRide(false);
      setPrevRide(true);
      setUpComingRide(false);
      setPreloader(true);
    }
  };

  const user = api.user.station_code;
  const nearestRide = [];

  api.nearestRide.forEach((nr) => {
    let count = 0;
    for (let i = 0; i < nr.station_path.length; i++) {
      const element = nr.station_path[i];

      if (element >= user) {
        count += 1;
        nearestRide.push({ ...nr, distance: element - user });
        if (count === 1) {
          break;
        }
      }
    }
  });

  const sortedRide = nearestRide.sort((a, b) => {
    return a.distance - b.distance;
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.rideSpan}>
          <span
            onClick={() => handleRide("near")}
            className={nearRide ? styles.ride : ""}
          >
            Nearest Ride({api.nearestRide.length})
          </span>
          <span
            onClick={() => handleRide("upComing")}
            className={upComingRide ? styles.ride : ""}
          >
            Upcoming Ride({api.upComingRide.length})
          </span>
          <span
            onClick={() => handleRide("prev")}
            className={prevRide ? styles.ride : ""}
          >
            Past Ride({api.prevRide.length})
          </span>
        </div>

        <div className={styles.filterSpan}>
          <div onClick={() => setShowFilter(!showFilter)}>
            <Image src="/img/Vector.png" alt="" width={18} height={12} />
            <span>Filter</span>
          </div>

          {showFilter && (
            <div className={styles.filterState}>
              <div className={styles.filterWrapper}>
                <div className={styles.filter}>
                  <span>Filters</span>
                </div>
                <select name="" id="">
                  <option value="">State</option>
                  <option value={newState}>{newState}</option>
                </select>
                <select name="" id="">
                  <option value="">City</option>
                  <option value={newCity}>{newCity}</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.allRide}>
        {preloader && <div className={styles.preloader}></div>}

        {nearRide &&
          sortedRide.map((near) => <Card nearestRide={near} key={near.id} />)}

        {prevRide &&
          api.prevRide.map((prev) => <Card prevRide={prev} key={prev.id} />)}

        {upComingRide &&
          api.upComingRide.map((upComing) => (
            <Card upComingRide={upComing} key={upComing.id} />
          ))}
      </div>
    </div>
  );
}

export default Features;
