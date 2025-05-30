import React, { useState, useEffect } from 'react'

const Antrian = () => {
    const { noantri } = useState(localStorage.getItem('no'))
  const [time, setTime] = useState(getTime());
  useEffect(() => {
    let timer1 = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => {
      clearInterval(timer1);
    };
  }, [time]);
    function getTime() {
  let ampm;
  const d = new Date();
  var hour = d.getHours();
  var min = d.getMinutes();
  if (hour >= 12) {
    ampm = "PM";
    hour === 12 ? (hour = 12) : (hour = ("0" + (hour - 12)).slice(-2));
  } else {
    ampm = "AM";
    hour === 0 ? (hour = 12) : (hour = ("0" + hour).slice(-2));
  }
  if (min < 10) min = ("0" + min).slice(-2);
  // console.log(`${hour} : ${min} ${ampm}`);
  return `${hour}:${min} ${ampm}`;
}
    return (
        <div>
                <nav id="navbar">
      {/* <img
        src={require("../../assets/img/companylogo.png")}
        alt="Hospital Logo"
        className="logobaru"
      /> */}
      <h1 className="title">RSUD Prof. Dr. Margono Soekarjo</h1>
      <div className="clock-wrapper">
        <span>{time.slice(0, 2)}</span>
        <span>:</span>
        <span>{`${time.slice(3, 6)} ${time.slice(-2)}`}</span>
      </div>
    </nav>
            Nomor : {noantri}
        </div>
    )
}

export default Antrian;