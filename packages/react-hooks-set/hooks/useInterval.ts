/**
 * 验证码倒计时
 */

import { useState, useEffect, useRef } from "react";

export type UseIntervalProps = {
  distance?: number;
};

const useInterval = (props?: UseIntervalProps) => {
  const timer = useRef<any>();
  const [disabled, setDisabled] = useState(false);
  const [seconds, setSeconds] = useState(props?.distance ?? 60);

  const startCount = () => {
    timer.current = setInterval(() => setSeconds((pre) => --pre), 1000);
    setDisabled(true);
  };

  const init = () => {
    setDisabled(false);
    clearInterval(timer.current);
    timer.current = undefined;
    setSeconds(props?.distance ?? 60);
  };

  useEffect(() => {
    init();
    return () => {
      clearInterval(timer.current);
      timer.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (seconds > 0) return;
    init();
  }, [seconds]);

  return {
    seconds,
    startCount,
    disabled,
  };
};

export default useInterval;
