import React from "react";
import { HeaderLeft, HeaderMiddle, HeaderRight } from './components';
import classes from "./_header.module.scss";

export default function Header({ ...props }) {
    const { visibilityToggler } = props;

    return (
        <header className={classes.Header}>
            <HeaderLeft />
            <HeaderMiddle />
            <HeaderRight visibilityToggler={visibilityToggler} />
        </header>
    );
}
