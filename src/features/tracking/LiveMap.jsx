import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaUser, FaPhoneAlt, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { MdSignalWifi4Bar, MdSignalWifiOff, MdArrowBack } from "react-icons/md";
import "../../styleSheets/liveMap.css";
import { API } from "../../api/baseUrl";

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // 🔑 replace

const LiveMap = ({
    bookingId,
    workerName = "Ravi Kumar",
    workerPhone = "+91 98765 43210",
    workerExp = 5,
    workerRating = 4.8,
    onBack,
}) => {
    /* ── refs ─────────────────────────────────── */
    const mapRef = useRef(null);
    const googleMapRef = useRef(null);
    const markerRef = useRef(null);
    const polylineRef = useRef(null);
    const wsRef = useRef(null);
    const reconnectRef = useRef(null);
    const reconnectCount = useRef(0);

    /* ── state ────────────────────────────────── */
    const [location, setLocation] = useState(null);
    const [connected, setConnected] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [ripple, setRipple] = useState(false);
    const [statusText, setStatusText] = useState("Connecting…");

    /* ─────────────────────────────────────────────────────────────
       1. GOOGLE MAPS INIT
    ───────────────────────────────────────────────────────────── */
    const initMap = useCallback(() => {
        if (!mapRef.current || googleMapRef.current) return;

        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
            center: { lat: 17.385, lng: 78.4867 },
            zoom: 15,
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
                { featureType: "poi", stylers: [{ visibility: "off" }] },
                { featureType: "transit", stylers: [{ visibility: "off" }] },
            ],
        });

        polylineRef.current = new window.google.maps.Polyline({
            geodesic: true,
            strokeColor: "#6366f1",
            strokeOpacity: 0.75,
            strokeWeight: 5,
            map: googleMapRef.current,
        });
    }, []);

    useEffect(() => {
        if (window.google?.maps) { initMap(); return; }
        if (document.getElementById("gmap-script")) return;   // already loading
        const s = document.createElement("script");
        s.id = "gmap-script";
        s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
        s.async = true;
        s.onload = initMap;
        document.head.appendChild(s);
    }, [initMap]);

    /* ─────────────────────────────────────────────────────────────
       2. MOVE MARKER + EXTEND TRAIL
    ───────────────────────────────────────────────────────────── */
    const updateMap = useCallback((lat, lng) => {
        if (!googleMapRef.current) return;
        const pos = { lat, lng };
        googleMapRef.current.panTo(pos);

        if (markerRef.current) {
            markerRef.current.setPosition(pos);
        } else {
            markerRef.current = new window.google.maps.Marker({
                position: pos,
                map: googleMapRef.current,
                icon: {
                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 5,
                    fillColor: "#6366f1",
                    fillOpacity: 1,
                    strokeColor: "#fff",
                    strokeWeight: 2,
                    rotation: 0,
                },
                title: "Caregiver",
            });
        }

        // trail — keep last 60 points
        const path = polylineRef.current.getPath();
        path.push(new window.google.maps.LatLng(lat, lng));
        if (path.getLength() > 60) path.removeAt(0);
    }, []);

    /* ─────────────────────────────────────────────────────────────
       3. WEBSOCKET — connects to /api/ws/customer/{bookingId}
    ───────────────────────────────────────────────────────────── */
    const connectWS = useCallback(() => {
        if (!bookingId) return;
        const token = localStorage.getItem("token");
        const url = `${API.TRACKING}/ws/customer/${bookingId}?token=${token}`;
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
            setConnected(true);
            setStatusText("Caregiver is on the way");
            reconnectCount.current = 0;
            console.log("[WS] Customer connected");
        };

        ws.onmessage = ({ data: raw }) => {
            const data = JSON.parse(raw);

            // server ping → reply pong
            if (data.type === "ping") {
                ws.send(JSON.stringify({ type: "pong" }));
                return;
            }

            // location payload from Redis
            const lat = parseFloat(data.lat);
            const lng = parseFloat(data.lng);
            if (!isNaN(lat) && !isNaN(lng)) {
                setLocation({ lat, lng });
                setLastUpdated(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
                updateMap(lat, lng);
                setRipple(true);
                setTimeout(() => setRipple(false), 700);
            }

            if (data.status) setStatusText(data.status);
        };

        ws.onclose = () => {
            setConnected(false);
            // exponential back-off: 2s, 4s, 8s … capped at 30s
            const delay = Math.min(2000 * 2 ** reconnectCount.current, 30000);
            reconnectCount.current += 1;
            console.log(`[WS] Reconnecting in ${delay / 1000}s…`);
            reconnectRef.current = setTimeout(connectWS, delay);
        };

        ws.onerror = () => ws.close();
    }, [bookingId, updateMap]);

    useEffect(() => {
        connectWS();
        return () => {
            wsRef.current?.close();
            clearTimeout(reconnectRef.current);
        };
    }, [connectWS]);

    /* ─────────────────────────────────────────────────────────────
       4. RENDER
    ───────────────────────────────────────────────────────────── */
    return (
        <div className="lm-root">

            {/* ── HEADER ── */}
            <header className="lm-header">
                <button className="lm-back" onClick={onBack}>
                    <MdArrowBack size={20} />
                </button>

                <div className="lm-header-center">
                    <span className="lm-title">Live Tracking</span>
                    {lastUpdated && (
                        <span className="lm-subtitle">Updated {lastUpdated}</span>
                    )}
                </div>

                <div className={`lm-signal ${connected ? "live" : "off"}`}>
                    {connected
                        ? <><MdSignalWifi4Bar size={13} /> Live</>
                        : <><MdSignalWifiOff size={13} /> Reconnecting</>
                    }
                </div>
            </header>

            {/* ── MAP ── */}
            <div className="lm-map-wrap">
                <div ref={mapRef} className="lm-map" />

                {/* location update ripple */}
                <div className={`lm-ripple ${ripple ? "go" : ""}`} />

                {/* disconnected overlay */}
                {!connected && (
                    <div className="lm-overlay">
                        <MdSignalWifiOff size={32} />
                        <p>Reconnecting to caregiver…</p>
                    </div>
                )}

                {/* status pill floating on map */}
                <div className="lm-status-pill">
                    <span className="lm-status-dot" />
                    {statusText}
                </div>
            </div>

            {/* ── BOTTOM CARD ── */}
            <div className="lm-card">

                {/* caregiver row */}
                <div className="lm-worker-row">
                    <div className="lm-avatar">
                        <FaUser size={18} />
                        <span className={`lm-dot ${connected ? "green" : "grey"}`} />
                    </div>

                    <div className="lm-worker-info">
                        <span className="lm-worker-name">{workerName}</span>
                        <span className="lm-worker-meta">
                            Caregiver · {workerExp} yrs
                            <span className="lm-rating">
                                <FaStar size={10} /> {workerRating}
                            </span>
                        </span>
                    </div>

                    <a href={`tel:${workerPhone}`} className="lm-call-fab" aria-label="Call">
                        <FaPhoneAlt size={14} />
                    </a>
                </div>

                {/* divider */}
                <div className="lm-divider" />

                {/* location row */}
                <div className="lm-info-row">
                    <FaMapMarkerAlt className="lm-info-icon" />
                    <span>
                        {location
                            ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
                            : "Waiting for caregiver location…"
                        }
                    </span>
                </div>

                {/* CTA */}
                <button
                    className="lm-cta"
                    onClick={() => window.open(`tel:${workerPhone}`)}
                >
                    <FaPhoneAlt size={13} />
                    Contact Caregiver
                </button>

            </div>
        </div>
    );
};

export default LiveMap;