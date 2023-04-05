import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipment } from "../redux/slices/shipment";
import support from "../assets/support.svg";
import "../styles/shipmentDetails.scss";

const ShipmentDetails = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.shipment);
  const { TransitEvents } = data;

  useEffect(() => {
    dispatch(fetchShipment());
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5% 0",
          fontFamily: "'Cairo', sans-serif",
          fontWeight: "500",
        }}
      >
        Here the details will appear..
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="shipmentDetails">
      <div className="table-details">
        <h2 className="table-title">Shipment Details</h2>
        <table>
          <thead>
            <tr>
              <th>Hub</th>
              <th>Date</th>
              <th>Time</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              TransitEvents?.map((event) => (
                <tr key={Math.random()}>
                  <td>{event?.hub || "-"}</td>
                  <td>
                    {new Date(event?.timestamp).toLocaleString("en-US", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }) || "-"}
                  </td>
                  <td>
                    {new Date(event?.timestamp).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    }) || "-"}
                  </td>
                  <td>{event?.state || "-"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="shipmentDetails__address">
        <h2>Delivery Address</h2>
        <div className="shipmentDetails__address_container">
          امبابة شارع طلعت حرب مدينة العمال بجوار البرنس منزل 17 بلوك 22 ,,
          Cairo
        </div>
        <div className="shipmentDetails__address_report">
          <div className="help_center">
            <p className="help_title">
              Is there a problem with your shipment ?!
            </p>
            <button type="submit" className="help_btn">
              Report your problem
            </button>
          </div>
          <img className="help_img" alt="logo" src={support} />
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
