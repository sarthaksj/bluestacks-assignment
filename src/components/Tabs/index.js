import React from "react";
import TabItem from "./components/TabItem";
import classes from "./_tabs.module.scss";

const menu = [
    {
        type: "UPCOMING",
        title: "UPCOMING CAMPAIGNS",
    },
    {
        type: "LIVE",
        title: "LIVE CAMPAIGNS",
    },
    {
        type: "PAST",
        title: "PAST CAMPAIGNS",
    },
];

export default function Tabs({ callback, eventType }) {

    const renderTabs = () => {
        return menu.map((tab, idx) => {
            return (
                <TabItem
                    key={idx}
                    className={eventType === tab.type ? classes.isActive : ""}
                    type={tab.type}
                    title={tab.title}
                    callback={callback}
                />
            );
        });
    };

    return (
        <div className={classes.Tabs}>
            <ul>{renderTabs()}</ul>
        </div>
    );
}
