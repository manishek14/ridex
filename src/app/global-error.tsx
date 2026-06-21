"use client";

import { useEffect } from "react";
import { extractErrorDetails, formatErrorLog, getLikelyRootCause } from "@/lib/error-handler";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; cause?: unknown };
  reset: () => void;
}) {
  useEffect(() => {
    const detail = extractErrorDetails(error);
    console.error(formatErrorLog(detail));

    const root = getLikelyRootCause(detail);
    console.error(
      `🔎 Likely Root Cause Area: ${root.area}\n💡 Hint: ${root.hint}`
    );
  }, [error]);

  return (
    <html>
      <body style={{ padding: 24, fontFamily: "system-ui", direction: "rtl" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
          خطای بحرانی
        </h1>
        <p style={{ color: "#6b7280", marginBottom: 16 }}>
          {error?.message || "Unknown error"}
        </p>

        <details style={{ marginBottom: 16 }}>
          <summary>نمایش جزئیات خطا</summary>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(
              {
                message: error?.message,
                digest: (error as any)?.digest,
                stack: error?.stack,
                cause: (error as any)?.cause,
              },
              null,
              2
            )}
          </pre>
        </details>

        <button
          onClick={reset}
          style={{
            padding: "10px 16px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          تلاش مجدد
        </button>
      </body>
    </html>
  );
}


