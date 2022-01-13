import React from "react";
import classes from "../_modal.module.scss";

export const ModalBody = ({ children, ...props }) => {
    return <div className={classes.Modal_Body}>{children}</div>;
};