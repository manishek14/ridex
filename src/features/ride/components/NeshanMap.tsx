// src/features/ride/components/NeshanMap.tsx
"use client";

export function NeshanMap() {
  const lat = 35.6892;
  const lng = 51.3890;

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden bg-bg2 border border-bdr">
      <iframe
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05}%2C${lat - 0.05}%2C${lng + 0.05}%2C${lat + 0.05}&layer=mapnik&marker=${lat}%2C${lng}`}
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title="نقشه"
      />
    </div>
  );
}