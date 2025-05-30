import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const Jam = () => {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{time.format("HH:mm:ss")}</div>;
};

export default Jam;
