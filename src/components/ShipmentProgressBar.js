import React, { useState, useEffect } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";

import { BiCheck } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { BsBagCheckFill } from "react-icons/bs";
import "../styles/progress-bar.scss";

const Colors = {
  red: "red",
  orange: "orange",
  green: "green",
};

const steps = [
  {
    status: ["TICKET_CREATED"],
    icon: <BiCheck />,
  },
  {
    status: ["PACKAGE_RECEIVED"],
    icon: <BiCheck />,
  },
  {
    status: ["DELIVERED_TO_SENDER"],
    icon: <FaShippingFast />,
    reason: "تأجيل - العميل طلب التاجيل ليوم اخر",
  },
  {
    status: ["DELIVERED"],
    icon: <BsBagCheckFill />,
  },
];

const ShipmentProgress = ({ currentStatus, trackingDataTransit }) => {
  const [dataTransit, setDataTransit] = useState("");
  const [status, setStatus] = useState();

  useEffect(() => {
    setDataTransit(trackingDataTransit);
  }, [trackingDataTransit, dataTransit]);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const progressBarColor =
    status === "CANCELLED"
      ? Colors.red
      : status === "DELIVERED"
      ? Colors.green
      : Colors.orange;

  const transfer = {
    status: status, // Change shipment status to progress bar
  };

  const getStepPosition = (transferStatus) => {
    if (status === "DELIVERED_TO_SENDER") {
      return 2;
    }
    return steps.findIndex(({ status }) => status === transferStatus);
  };

  return (
    <div className="progressBar">
      <ProgressBar
        percent={getStepPosition(transfer.status) * 33.33}
        filledBackground={progressBarColor}
      >
        {steps.map((step, index, arr) => {
          return (
            <Step
              key={index}
              position={100 * (index / arr.length)}
              transition="scale"
              children={({ accomplished }) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8rem",
                    marginRight: "5rem",
                    borderRadius: "50%",
                    width: accomplished ? 20 : 40,
                    height: accomplished ? 20 : 40,
                    color: "#fff",
                    backgroundColor:
                      accomplished || transfer.status === step.status
                        ? progressBarColor
                        : "gray",
                  }}
                >
                  {accomplished ? (
                    <BiCheck className="progressBar_icon" />
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
                  {step.reason && (
                    <span
                      className="progressBar_accomplished__reason"
                      style={{ color: `${progressBarColor}` }}
                    >
                      {step.reason}
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
