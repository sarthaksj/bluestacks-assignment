import React, { useState } from "react";
import classes from "../styles/Home.module.css";
import Tabs from "../components/Tabs";
import Table from "../components/Table";

export default function Home() {
  const [eventType, setEventType] = useState("UPCOMING");

  const toggleEvent = (type) => setEventType(type);

  return (
    <div className={classes.container}>
      <div className={classes.Home__heading}>
        <span>Manage</span>
        <span>Campaigns</span>
      </div>
      <Tabs callback={toggleEvent} eventType={eventType} />
      <Table eventType={eventType} />
    </div>
  );
}

// import dynamic from "next/dynamic";
// import { ModalHeader, ModalBody, ModalFooter } from "../components/Modal";
// const ModalWithNoSSR = dynamic(() => import("../components/Modal"), {
//   ssr: false,
// });
// const [isOpen, setIsOpen] = useState(false);
// const openModal = () => setIsOpen(true);
// const closeModal = () => setIsOpen(false);
// {/* <button onClick={openModal}>Toggle Modal</button> */ }
// {/* <ModalWithNoSSR show={isOpen} callback={closeModal}>
//         <ModalHeader>Im Modal Header</ModalHeader>
//         <ModalBody>Hello</ModalBody>
//         <ModalFooter>Im Modal Footer </ModalFooter>
//       </ModalWithNoSSR> */}
