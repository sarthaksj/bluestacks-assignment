import React from "react";
import "../_tabs.module.scss";

export default function TabItem({ ...props }) {
    const { title, type, callback, className } = props;
    return (
        <li onClick={() => callback(type)} className={className}>
            <a>{title}</a>
        </li>
    );
}
