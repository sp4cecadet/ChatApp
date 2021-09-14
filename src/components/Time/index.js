import PropTypes from "prop-types";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import { useState, useEffect } from "react";

const Time = ({ date }) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ruLocale,
  });
};

Time.propTypes = {
  date: PropTypes.string,
};

export default Time;
