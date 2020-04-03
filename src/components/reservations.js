import React from "react";
import useSWR from "swr";
import Reservation from "./reservation";
import { Redirect } from "react-router-dom";

const URL = `${process.env.REACT_APP_URL_API_BASE}/reservations`;
const fetcher = url =>
  fetch(url, {
    headers: {
      Authorization: localStorage.getItem("auth-token")
    }
  }).then(r => r.json());

const Reservations = () => {
  const token = localStorage.getItem("auth-token");

  const { data, error } = useSWR(URL, fetcher);

  if (token) {
    return <Redirect to="/reservations" />;
  }

  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;

  const { data: reservations } = data;

  return (
    <div>
      {reservations.map((reservation, index) => (
        <Reservation key={index} reservation={reservation} />
      ))}
    </div>
  );
};

export default Reservations;
