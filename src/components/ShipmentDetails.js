import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchShipment } from "../redux/slices/shipment";
import support from "../assets/support.png";
import "../styles/shipmentDetails.scss";

const ShipmentDetails = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.shipment);
  const { TransitEvents } = data;

  const { t } = useTranslation();

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
          fontFamily: "'Cairo', sans-serif",
          fontWeight: "500",
          fontSize: "14px",
        }}
      >
        {t("loading")}
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="shipmentDetails">
      <div className="table-details">
        <h2 className="table-title">{t("tracking_table.header")}</h2>
        <table>
          <thead>
            <tr>
              <th>{t("tracking_table.hub")}</th>
              <th>{t("tracking_table.date")}</th>
              <th>{t("tracking_table.time")}</th>
              <th>{t("tracking_table.details")}</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              TransitEvents?.map((event) => (
                <tr key={Math.random()}>
                  <td>{t("dummyLocationShort")}</td>
                  <td>
                    {t("dateShort", {
                      val: event?.timestamp ? new Date(event?.timestamp) : null,
                    })}
                    {/* {new Date(event?.timestamp).toLocaleString("ar-EG", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }) || "-"} */}
                  </td>
                  <td>
                    {t("dateTime", {
                      val: event?.timestamp ? new Date(event?.timestamp) : null,
                    })}
                    {/* {new Date(event?.timestamp).toLocaleTimeString("ar-EG", {
                      hour: "numeric",
                      minute: "numeric",
                    }) || "-"} */}
                  </td>
                  <td>{t(`tracking.${event?.state}`, "-")}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="shipmentDetails__address">
        <h2>{t("reportProblem.header")}</h2>
        <div className="shipmentDetails__address_container">
          {t("dummyLocationLong")}
        </div>

        <div className="shipmentDetails__address_report">
          <div className="help_center">
            <p className="help_title">{t("reportProblem.question")}</p>
            <button type="submit" className="help_btn">
              {t("reportProblem.button")}
            </button>
          </div>
          <img className="help_img" alt="logo" src={support} />
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
