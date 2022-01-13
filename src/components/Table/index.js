import React, { useState } from "react";
import JsonData from "../../data/data.json";
import TableRow from "./components/TableRow";
import classes from "./_table.module.scss";

export default function Table({ eventType }) {
    const [data, setData] = useState(JsonData.campaigns);

    const getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0"); // Days Are 1 Indexed
        let mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0 Indexed!
        let yyyy = today.getFullYear();
        return `${mm}-${dd}-${yyyy}`;
    };

    const dateComparator = (start, end) => {
        if (end === "") return start;
        const date1 = new Date(start);
        const date2 = new Date(end);

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.ceil(diffInTime / oneDay);

        return diffInDays;
    };

    const renderDataAccordingToEventType = () => {
        const output = [];
        for (let d of data) {
            if (eventType === "UPCOMING") {
                if (dateComparator(getCurrentDate(), d.meta.date) > 0) output.push(d);
            }

            if (eventType === "LIVE") {
                if (dateComparator(getCurrentDate(), d.meta.date) === getCurrentDate())
                    output.push(d);
            }

            if (eventType === "PAST") {
                if (dateComparator(getCurrentDate(), d.meta.date) < 0) output.push(d);
            }
        }
        return output;
    };

    const modifyEvent = (id, itemAttributes) => {
        let index = data.findIndex((x) => x.id === id);
        const temp_state = [...data];
        const temp_element = { ...temp_state[index] };
        temp_element.meta.date = itemAttributes;
        temp_state[index] = temp_element;
        setData(temp_state);
    };

    const renderTableRows = () => {
        return renderDataAccordingToEventType().map((el) => {
            return (
                <TableRow
                    key={el.id}
                    id={el.id}
                    date={el.meta.date}
                    place={el.meta.stadium}
                    campaign={el.meta.name}
                    src={el.images.crest}
                    callback={modifyEvent}
                />
            );
        });
    };

    return (
        <div className={classes.Table__container}>
            <table className={classes.Table}>
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>CAMPAIGN</th>
                        <th>VIEW</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </table>
        </div>
    );
}
