import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchShipment } from "../redux/slices/shipment";
import ProgressBar from "./ShipmentProgressBar";
import "../styles/trackingForm.scss";

const TrackingForm = () => {
  const { loading, data, error } = useSelector((state) => state.shipment);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        {t("insert_trackingNumber")}
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
              <th>
                {t("tracking_status.trackingNumber")} {TrackingNumber}
              </th>
              <th>{t("tracking_status.lastUpdate")}</th>
              <th>{t("tracking_status.providerName")}</th>
              <th>{t("tracking_status.deliveryTimeWithin")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t(`tracking.${CurrentStatus?.state}`, "-")}</td>
              <td>
                {t("dateLong", {
                  val: CurrentStatus?.timestamp
                    ? new Date(CurrentStatus?.timestamp)
                    : null,
                })}
              </td>
              <td>{provider}</td>
              <td>
                {t("dateMedium", {
                  val: PromisedDate ? new Date(PromisedDate) : null,
                })}
              </td>
            </tr>
            <tr>
              <td className="trackingProgress">
                <ProgressBar
                  currentStatus={t(`tracking.${CurrentStatus?.state}`)}
                  trackingDataTransit={TransitEvents}
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
