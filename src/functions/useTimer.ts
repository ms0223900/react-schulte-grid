import { useEffect, useMemo, useState } from "react";

const useTimer = () => {
  const [isTicking, setTimerTicking] = useState(false);
  const [time, setTime] = useState(0);

  const handledTime = useMemo(() => {
    // console.log(time);
    return (time / 1000).toFixed(1);
  }, [time]);

  useEffect(() => {
    let timer = setInterval(() => {
      if (!isTicking) return;
      setTime((s) => s + 100);
    }, 100);

    return () => clearInterval(timer);
  }, [isTicking]);

  return {
    isTicking,
    setTimerTicking,
    time,
    setTime,
    handledTime,
  };
};

export default useTimer;
