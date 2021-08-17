import React from "react";
import PropTypes from "prop-types";
import { Button as BaseButton } from "antd";
import cn from "classnames";

import "./Button.scss";

const Button = (props) => {
  return (
    <BaseButton
      {...props}
      className={cn("button", props.className, {
        "button--large": props.size === "large",
      })}
    />
  );
};

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
