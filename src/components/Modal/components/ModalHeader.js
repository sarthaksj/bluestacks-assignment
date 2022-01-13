import React from "react";
import classes from "../_modal.module.scss";

export const ModalHeader = ({ children, ...props }) => {
    return <div className={classes.Modal_Header}>{children}</div>;
};