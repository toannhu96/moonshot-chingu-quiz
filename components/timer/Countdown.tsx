import React from "react";
import { useTimer } from "react-timer-hook";
import TimerStyled from "./TimerStyled";

export default function Countdown({ expiryTimestamp, callback }: Object) {
  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => callback(),
  });

  return (
    <TimerStyled
      seconds={seconds}
      minutes={minutes}
      hours={hours}
      days={days}
    />
  );
}
