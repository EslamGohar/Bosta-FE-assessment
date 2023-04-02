import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipment } from "../redux/slices/shipment";
import "../styles/trackingForm.scss";

const TrackingForm = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.shipment);

  useEffect(() => {
    dispatch(fetchShipment(7234258));
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const { TrackingNumber, provider, PromisedDate, CurrentStatus } = data;

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
          </tbody>
        </table>
      )}
    </div>

    /* <div className="trackingDetails">
        <div className="trackingDetails_shipment">
          <ul className="trackingDetails_shipment__data">
            <li>
              <label className="label">ship Number {TrackingNumber}</label>
              <span className="status">{CurrentStatus?.state}</span>
            </li>
            <li>
              <label className="label">last update</label>
              <span className="status">
                {new Date(CurrentStatus?.timestamp).toLocaleString()}
              </span>
            </li>
            <li>
              <label className="label">seller name</label>
              <span className="status">{provider}</span>
            </li>
            <li>
              <label className="label">delivered date</label>
              <span className="status">
                {new Date(PromisedDate).toLocaleString()}
              </span>
            </li>
          </ul>
        </div>
      </div> */
  );
};

export default TrackingForm;
