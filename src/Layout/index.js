import React, { Fragment, useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import classes from "./_layout.module.scss";

export default function Layout({ main }) {
    const [visible, setVisible] = useState(false);

    return (
        <Fragment>
            <Header visibilityToggler={() => setVisible((visible) => !visible)} />
            <div className={classes.Layout}>
                <Sidebar {...visible} />
                <main className={classes.Main}>{main}</main>
            </div>
        </Fragment>
    );
}
