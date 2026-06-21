"use client";

import { use } from "react";

interface RideDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function RideDetailsPage({ params }: RideDetailsPageProps) {
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4" dir="ltr">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Ride Details</h1>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400">{`Ride ID: ${id}`}</p>
          {/* Ride details will be loaded here */}
        </div>
      </div>
    </div>
  );
}
