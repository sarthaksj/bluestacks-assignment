import React from "react";
import classes from "../_header.module.scss";

export const HeaderRight = ({ ...props }) => {
    const { visibilityToggler } = props;

    return (
        <div className={classes.Header__right}>
            <div className={classes.Drawer__Toggle} onClick={visibilityToggler}>
                <i className="fas fa-bars" />
            </div>
        </div>
    );
};
