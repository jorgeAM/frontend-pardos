import React from "react";

const Reservation = props => {
  const { reservation } = props;
  return (
    <div>
      <p>{reservation.name}</p>
    </div>
  );
};

export default Reservation;
