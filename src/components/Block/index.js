import React from "react";
import * as cn from "classnames";
import "./Block.scss";

const Block = ({ children, className }) => {
  return <div className={cn("block", className)}>{children}</div>;
};

export default Block;
