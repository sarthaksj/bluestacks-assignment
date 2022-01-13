import React, { useEffect, useState } from "react";
import JsonData from "../../data/data.json";
import TableRow from "./components/TableRow";
import classes from "./_table.module.scss";

export default function Table({ eventType }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const json = JsonData.campaigns[0];
        if (eventType === "UPCOMING") {
            setData(json.upcoming_campaigns);
        }
        if (eventType === "LIVE") {
            setData(json.live_campaigns);
        }
        if (eventType === "PAST") {
            setData(json.past_campaigns);
        }
    }, [eventType]);

    const modifyEvent = (id, itemAttributes) => {
        let index = data.findIndex((x) => x.id === id);
        const temp_state = [...data];
        const temp_element = { ...temp_state[index] };
        temp_element.meta.date = itemAttributes;
        temp_state[index] = temp_element;
        setData(temp_state);
    };

    const renderTableRows = () => {
        return data.map((el) => {
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

