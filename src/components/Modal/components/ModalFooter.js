import React from "react";
import classes from "../_modal.module.scss";

export const ModalFooter = ({ children, ...props }) => {
    return <div className={classes.Modal_Footer}>{children}</div>;
};