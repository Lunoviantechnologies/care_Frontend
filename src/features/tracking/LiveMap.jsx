import React from "react";
import { FaUser, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "../../styleSheets/liveMap.css";

const LiveMap = () => {
    return (
        <div className="liveMapContainer">

            {/* Top Bar */}
            <div className="liveHeader">
                <h5>Tracking Caregiver</h5>
                <span className="status">On the way</span>
            </div>

            {/* Map Section */}
            <div className="mapSection">
                <iframe
                    title="map"
                    src="https://maps.google.com/maps?q=hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Bottom Details Card */}
            <div className="detailsCard">

                <div className="caregiverInfo">
                    <FaUser className="icon" />
                    <div>
                        <h6>Ravi Kumar</h6>
                        <p>Caregiver • 5 yrs experience</p>
                    </div>
                </div>

                <div className="infoRow">
                    <FaPhoneAlt className="icon" />
                    <span>+91 98765 43210</span>
                </div>

                <div className="infoRow">
                    <FaMapMarkerAlt className="icon" />
                    <span>Arriving in 15 mins</span>
                </div>

                <button className="btn btn-success w-100 mt-3">
                    Contact Caregiver
                </button>

            </div>

        </div>
    );
};

export default LiveMap;