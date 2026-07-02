"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMiniMapProps {
  isFa?: boolean;
  center?: [number, number];
  zoom?: number;
}

export function LeafletMiniMap({
  isFa = true,
  center = [35.6997, 51.3380], // Azadi Sq, Tehran
  zoom = 13,
}: LeafletMiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: false,
      attributionControl: false,
      dragging: true,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Pickup marker (pulsing custom icon)
    const pickupIcon = L.divIcon({
      className: "",
      html: `
        <div style="position:relative;width:38px;height:38px;transform:translate(-50%,-50%);">
          <div style="position:absolute;inset:-8px;border-radius:50%;border:2px solid rgba(59,130,246,0.4);animation:ring 2.5s ease-out infinite;"></div>
          <div style="position:absolute;inset:0;border-radius:50%;background:#3b82f6;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;box-shadow:0 6px 22px rgba(59,130,246,0.55);">📍</div>
        </div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });
    L.marker(center, { icon: pickupIcon }).addTo(map);

    // Destination marker
    const destination: [number, number] = [35.7219, 51.3347];
    const destIcon = L.divIcon({
      className: "",
      html: `
        <div style="width:30px;height:30px;border-radius:50%;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;border:2px solid #fff;box-shadow:0 4px 16px rgba(0,0,0,0.35);transform:translate(-50%,-50%)">🏁</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
    L.marker(destination, { icon: destIcon }).addTo(map);

    // Route polyline (simple straight-ish line for example)
    L.polyline([center, destination], {
      color: "#3b82f6",
      weight: 4,
      opacity: 0.7,
      dashArray: "8 8",
    }).addTo(map);

    // Fit bounds with padding
    map.fitBounds(L.latLngBounds(center, destination).pad(0.6));

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1]"
      aria-label={isFa ? "نقشه پیش‌نمایش" : "Map preview"}
    />
  );
}