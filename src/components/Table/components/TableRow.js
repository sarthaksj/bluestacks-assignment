import React, { Fragment, useState } from "react";
import Avatar from "../../Avatar";
import dynamic from "next/dynamic";
import { ModalHeader, ModalBody, ModalFooter } from "../../Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "../_table.module.scss";

const ModalWithNoSSR = dynamic(() => import("../../Modal"), {
    ssr: false,
});

export default function TableRow({ date, campaign, src, place, callback, id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const openModal = (type) => {
        setIsOpen(true);
        setModalType(type);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalType("");
    };

    function getNumberOfDays(end) {
        if (end === "") return "";
        const date1 = new Date();
        const date2 = new Date(end);

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.ceil(diffInTime / oneDay);

        return diffInDays;
    }

    const days = getNumberOfDays(date);
    const renderDate = () => {
        if (days < 0)
            return (
                <Fragment>
                    <p>{date}</p>
                    <p>{`${days * -1} Days Ago`}</p>
                </Fragment>
            );
        else if (days === "")
            return (
                <Fragment>
                    <p style={{ color: "red", fontSize: "18px" }}>
                        Live Now
                        <i className="fas fa-bullhorn" style={{ marginLeft: "10px" }} />
                    </p>
                </Fragment>
            );
        else
            return (
                <Fragment>
                    <p>{date}</p>
                    <p>{`${days} Days To Go`}</p>
                </Fragment>
            );
    };

    const renderModalHeader = () => {
        if (modalType === "PRICING") return "Pricing";
        if (modalType === "SCHEDULE") return "Schedule Again";
    };

    const renderModalContent = () => {
        if (modalType === "PRICING")
            return (
                <Fragment>
                    <div className={classes.Pricing}>
                        <span>
                            Adult: <strong>30$</strong>
                        </span>
                        <span>
                            Senior Citizen: <strong>20$</strong>
                        </span>
                        <span>
                            10 - 15 Years: <strong>15$</strong>
                        </span>
                        <span>
                            Below 10 Years: <strong>Free</strong>
                        </span>
                    </div>
                </Fragment>
            );
        if (modalType === "SCHEDULE")
            return (
                <Fragment>
                    <h3>Last Campaign Date Was: <b>{date}</b></h3>
                    <div>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)} />
                    </div>
                </Fragment>
            );
    };



    const formatDate = (unformattedDate) => {
        let today = new Date(unformattedDate);
        let dd = String(today.getDate()).padStart(2, '0'); // Days Are 1 Indexed
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0 Indexed!
        let yyyy = today.getFullYear();
        return `${mm}-${dd}-${yyyy}`;
    }

    const renderModalFooter = () => {
        if (modalType === "PRICING") return (
            <button onClick={closeModal}>Okay</button>
        );
        if (modalType === "SCHEDULE") return (
            <button onClick={() => {
                callback(id, formatDate(startDate))
                closeModal()
            }}>
                Schedule
            </button>
        );
    };


    return (
        <Fragment>
            <tr className={classes.TableRow}>
                <td width="150px">
                    <div className={classes.TableRow__first}>{renderDate()}</div>
                </td>

                <td width="300px">
                    <div className={classes.TableRow__second}>
                        <Avatar src={src} />
                        <div>
                            <p>{campaign}</p>
                            <p>{place}</p>
                        </div>
                    </div>
                </td>

                <td width="50px">
                    <div
                        onClick={() => openModal("PRICING")}
                        className={classes.TableRow__third}
                    >
                        <i className="fas fa-dollar-sign"></i>
                        <p>View Pricing</p>
                    </div>
                </td>

                <td width="250px">
                    <div className={classes.TableRow__fourth}>
                        <span>
                            <i className="fas fa-file-csv" />
                            <p>CSV</p>
                        </span>
                        <span>
                            <i className="fas fa-signal" />
                            <p>REPORT</p>
                        </span>
                        {days !== "" ? (
                            <span onClick={() => openModal("SCHEDULE")}>
                                <i className="fas fa-calendar-alt" />
                                <p>SCHEDULE AGAIN</p>
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                </td>
            </tr>
            <ModalWithNoSSR show={isOpen} callback={closeModal}>
                <ModalHeader>
                    <h3>{renderModalHeader()}</h3>
                </ModalHeader>
                <ModalBody>{renderModalContent()}</ModalBody>
                <ModalFooter>
                    {renderModalFooter()}
                </ModalFooter>
            </ModalWithNoSSR>
        </Fragment>
    );
}

