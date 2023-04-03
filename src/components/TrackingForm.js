import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipment } from "../redux/slices/shipment";
import ProgressBar from "./ShipmentProgressBar";
import "../styles/trackingForm.scss";

const TrackingForm = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.shipment);

  useEffect(() => {
    dispatch(fetchShipment());
  }, [dispatch]);

  if (loading) {
    return (
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12% 0",
          fontFamily: "'Cairo', sans-serif",
          fontWeight: "800",
        }}
      >
        Please, Insert Tracking Number into the track shipment menu above.
      </p>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const {
    TrackingNumber,
    provider,
    PromisedDate,
    CurrentStatus,
    TransitEvents,
  } = data;

  return (
    <div className="table-container">
      {data && (
        <table>
          <thead>
            <tr>
              <th>shipment number {TrackingNumber}</th>
              <th>last update</th>
              <th>provider</th>
              <th>Promised date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{CurrentStatus?.state}</td>
              <td>
                {new Date(CurrentStatus?.timestamp).toLocaleString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </td>
              <td>{provider}</td>
              <td>
                {new Date(PromisedDate).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
            </tr>
            <tr>
              <td className="trackingProgress">
                <ProgressBar
                  currentStatus={CurrentStatus?.state}
                  trackingDataTransit={TransitEvents?.state}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TrackingForm;
