import React, { useState, useEffect } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import { BiCheck } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { BsBagCheckFill } from "react-icons/bs";
import "../styles/progress-bar.scss";

const shipmentStates = {
  TICKET_CREATED: "Ticket created",
  PACKAGE_RECEIVED: "Package received",
  NOT_YET_SHIPPED: "Not yet shipped",
  WAITING_FOR_CUSTOMER_ACTION: "Waiting for customer action",
  IN_TRANSIT: "In transit",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED_TO_SENDER: "Delivered to sender",
  DELIVERED: "Delivered",
};

const shipmentStateReasons = {
  DELIVERED: "The shipment has been delivered",
  OUT_FOR_DELIVERY: "The shipment is out for delivery",
  IN_TRANSIT: "The shipment is in transit",
  RETRY_DELIVERY: "The customer is not in the address",
  POSTPONED: "The customer requested postponement for another day.",
  CUSTOMER_IS_NOT_ANSWERING: "Customer is not answering.",
  EXCEPTION: "An exception occurred with the shipment",
};

const Colors = {
  red: "red",
  green: "green",
  orange: "orange",
};

const steps = [
  {
    label: shipmentStates.TICKET_CREATED,
    content: shipmentStateReasons.TICKET_CREATED,
    icon: <BiCheck />,
  },
  {
    label: shipmentStates.PACKAGE_RECEIVED,
    content: shipmentStateReasons.PACKAGE_RECEIVED,
    icon: <BiCheck />,
  },
  {
    label: shipmentStates.DELIVERED_TO_SENDER,
    content: shipmentStateReasons.POSTPONED,
    icon: <FaShippingFast />,
  },
  {
    label: shipmentStates.DELIVERED,
    content: shipmentStateReasons.DELIVERED,
    icon: <BsBagCheckFill />,
  },
];

const ShipmentProgress = ({ currentStatus, trackingDataTransit }) => {
  const [transfer, setTransfer] = useState({});

  useEffect(() => {
    setTransfer({ status: currentStatus, dataTransit: trackingDataTransit });
  }, [currentStatus, trackingDataTransit]);

  const progressBarColor =
    transfer.status === "NOT_YET_SHIPPED"
      ? Colors.red
      : transfer.status === "DELIVERED"
      ? Colors.green
      : transfer.status === "IN_TRANSIT"
      ? Colors.orange
      : "";

  const getStepPosition = (transferStatus) => {
    if (transfer.status === "DELIVERED") return 2;

    return steps.findIndex(({ label }) => label === transferStatus);
  };

  return (
    <div className="progressBar">
      <ProgressBar
        height={"10px"}
        percent={getStepPosition(transfer.status) * 100}
        filledBackground={progressBarColor}
        unfilledBackground="#e7e7e7"
      >
        {steps.map((step, index, arr) => {
          return (
            <Step
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              key={index}
              position={100 * (index / arr.length)}
              transition="scale"
              children={({ accomplished }) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "17rem",
                    borderRadius: "50%",
                    width: accomplished ? 25 : 30,
                    height: accomplished ? 25 : 30,
                    color: "#fff",
                    fontSize: "15px",
                    backgroundColor:
                      accomplished || transfer.status === step.label
                        ? progressBarColor
                        : "gray",
                  }}
                >
                  {accomplished ? (
                    <BiCheck
                      className="progressBar_icon"
                      style={{ marginRight: "-25px" }}
                    />
                  ) : (
                    step.icon
                  )}
                  <label
                    className={
                      accomplished
                        ? "progressBar_accomplished__label"
                        : "progressBar_label"
                    }
                  >
                    {step.status}
                  </label>

                  {step.content && (
                    <span
                      className="progressBar_accomplished__reason"
                      style={{
                        color: `${progressBarColor}`,
                        width: "11rem",
                        fontSize: "13px",
                      }}
                    >
                      {step.content}
                    </span>
                  )}
                </div>
              )}
            />
          );
        })}
      </ProgressBar>
    </div>
  );
};

export default ShipmentProgress;
