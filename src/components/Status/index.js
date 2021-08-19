import PropTypes from "prop-types";
import cn from "classnames";

import "./Status.scss";

const Status = ({ online }) => (
  <span className={cn("status", { "status--online": online })}>
    {online ? "онлайн" : "не в сети"}
  </span>
);

Status.propTypes = {
  online: PropTypes.bool,
};

export default Status;
