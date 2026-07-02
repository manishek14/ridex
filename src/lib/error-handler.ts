/* src/lib/error-handler.ts
   Next.js 15 (App Router) + next-intl focused diagnostic logger
*/

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export interface DetailedError {
  message: string;
  code?: string;
  digest?: string;

  severity: ErrorSeverity;

  filePath?: string;
  line?: number;
  column?: number;

  url?: string;
  method?: string;
  statusCode?: number;

  stack?: string;
  componentStack?: string;

  cause?: unknown;

  timestamp: string;

  // diagnosis tags
  tags?: string[];
}

type StackLocation = {
  filePath?: string;
  line?: number;
  column?: number;
};

function safeToString(v: unknown) {
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function extractStackLocation(stack?: string): StackLocation {
  if (!stack) return {};
  const lines = stack.split("\n").map((l) => l.trim()).filter(Boolean);

  for (const l of lines) {
    // Common patterns:
    // at func (path/to/file.ts:10:5)
    // at path/to/file.ts:10:5
    const match = l.match(/\(?(.+?):(\d+):(\d+)\)?$/) || l.match(/\(?(.+?):(\d+):(\d+)\)?/);
    if (match) {
      return {
        filePath: match[1],
        line: Number(match[2]),
        column: Number(match[3]),
      };
    }
  }
  return {};
}

function detectTags(detail: DetailedError): string[] {
  const tags: string[] = [];
  const msg = (detail.message || "").toLowerCase();
  const stack = (detail.stack || "").toLowerCase();
  const combined = `${msg}\n${stack}`;

  // 404 / not found
  if (
    msg.includes("404") ||
    combined.includes("not found") ||
    combined.includes("notfound")
  ) {
    tags.push("route-404-or-not-found");
  }

  // next-intl
  if (
    combined.includes("next-intl") ||
    combined.includes("getmessages") ||
    combined.includes("getrequestconfig") ||
    combined.includes("messages") && combined.includes("next-intl")
  ) {
    tags.push("next-intl");
  }

  // module resolution
  if (combined.includes("module not found") || combined.includes("can't resolve")) {
    tags.push("module-resolution");
  }

  // filesystem permission / EPERM
  if (
    combined.includes("ep erm") ||
    combined.includes("epm") ||
    combined.includes("operation not permitted") ||
    msg.includes("permission")
  ) {
    tags.push("filesystem-permission-epm");
  }

  if (combined.includes(".next/trace") || combined.includes(".next\\trace")) {
    tags.push("next-build-trace-epm");
  }

  // build/compile crash
  if (
    combined.includes("build") &&
    (combined.includes("cannot") || combined.includes("fatal") || combined.includes("error"))
  ) {
    tags.push("build-or-compile-failure");
  }

  if (detail.severity === "critical") tags.push("critical");
  return tags;
}

function severityFromMessageAndStack(message: string, stack?: string): ErrorSeverity {
  const m = (message || "").toLowerCase();
  const s = (stack || "").toLowerCase();
  const combined = `${m}\n${s}`;

  if (
    m.includes("ep erm") ||
    combined.includes("ep erm") ||
    combined.includes("operation not permitted") ||
    m.includes("fatal") ||
    m.includes("cannot") ||
    m.includes("crash")
  ) {
    return "critical";
  }

  if (m.includes("module not found") || m.includes("can't resolve") || m.includes("not found")) {
    return "high";
  }

  if (m.includes("permission") || m.includes("403")) return "medium";
  if (m.includes("timeout") || m.includes("network")) return "high";

  return "medium";
}

export function extractErrorDetails(error: unknown): DetailedError {
  const timestamp = new Date().toISOString();

  // Next.js often passes errors with digest for error boundaries / routing
  if (error && typeof error === "object" && "digest" in (error as any)) {
    const e = error as any;

    const message =
      typeof e.message === "string"
        ? e.message
        : typeof e.toString === "function"
          ? e.toString()
          : "Next.js error";

    const { filePath, line, column } = extractStackLocation(e.stack);

    const detail: DetailedError = {
      message,
      code: typeof e.digest === "string" ? e.digest : undefined,
      digest: typeof e.digest === "string" ? e.digest : undefined,
      severity: severityFromMessageAndStack(message, e.stack),
      stack: e.stack,
      filePath,
      line,
      column,
      cause: e.cause,
      timestamp,
      componentStack: e.componentStack,
    };

    detail.tags = detectTags(detail);
    return detail;
  }

  if (error instanceof Error) {
    const { filePath, line, column } = extractStackLocation(error.stack);
    const detail: DetailedError = {
      message: error.message || "Unknown error",
      severity: severityFromMessageAndStack(error.message, error.stack),
      stack: error.stack,
      filePath,
      line,
      column,
      cause: (error as any).cause,
      timestamp,
    };
    detail.tags = detectTags(detail);
    return detail;
  }

  if (typeof error === "string") {
    const detail: DetailedError = {
      message: error,
      severity: severityFromMessageAndStack(error),
      timestamp,
    };
    detail.tags = detectTags(detail);
    return detail;
  }

  const detail: DetailedError = {
    message: `Unknown error: ${safeToString(error)}`,
    severity: "critical",
    cause: error,
    timestamp,
  };
  detail.tags = detectTags(detail);
  return detail;
}

export function formatErrorLog(detail: DetailedError): string {
  const sevColor: Record<ErrorSeverity, string> = {
    low: "\x1b[32m",
    medium: "\x1b[33m",
    high: "\x1b[35m",
    critical: "\x1b[31m",
  };

  const reset = "\x1b[0m";
  const bright = "\x1b[1m";
  const dim = "\x1b[2m";

  const tags =
    detail.tags && detail.tags.length
      ? `\n${bright}🏷️ Tags:${reset} ${detail.tags.join(", ")}`
      : "";

  let out = `\n${bright}${"═".repeat(78)}${reset}\n`;
  out += `${bright}❌ ${sevColor[detail.severity]}${detail.severity.toUpperCase()} ERROR${reset}${dim} ${detail.timestamp}${reset}\n`;
  out += `${bright}${"─".repeat(78)}${reset}\n`;
  out += `${bright}📝 Message:${reset} ${detail.message}\n`;

  if (detail.code) out += `${bright}🔢 Code/Digest:${reset} ${detail.code}\n`;

  if (detail.filePath) {
    out += `${bright}📁 File:${reset} ${detail.filePath}`;
    if (typeof detail.line === "number") {
      out += ` ${dim}(line ${detail.line}${typeof detail.column === "number" ? `, col ${detail.column}` : ""})${reset}`;
    } else {
      out += `\n`;
    }
  }

  if (typeof detail.statusCode === "number") out += `${bright}📊 Status:${reset} ${detail.statusCode}\n`;
  if (detail.method) out += `${bright}🌐 Method:${reset} ${detail.method}\n`;
  if (detail.url) out += `${bright}🔗 URL:${reset} ${detail.url}\n`;

  if (detail.stack) {
    out += `\n${bright}📚 Stack trace:${reset}\n${dim}${detail.stack}${reset}\n`;
  }

  if (detail.componentStack) {
    out += `\n${bright}🧩 Component stack:${reset}\n${dim}${detail.componentStack}${reset}\n`;
  }

  if (detail.cause !== undefined) {
    out += `\n${bright}💥 Cause:${reset}\n${dim}${safeToString(detail.cause)}${reset}\n`;
  }

  out += `${tags}\n`;
  out += `${bright}${"═".repeat(78)}${reset}\n\n`;
  return out;
}

export type RootCause = {
  area: "routing" | "next-intl" | "build" | "filesystem" | "unknown";
  hint: string;
};

export function getLikelyRootCause(detail: DetailedError): RootCause {
  const tags = detail.tags || [];

  if (tags.includes("filesystem-permission-epm") || tags.includes("next-build-trace-epm")) {
    return {
      area: "filesystem",
      hint:
        "Windows is blocking writes to .next (EPERM). Stop all Next/node processes, disable AV Controlled Folder Access for the project, then delete .next and rebuild.",
    };
  }

  if (tags.includes("next-intl")) {
    return {
      area: "next-intl",
      hint:
        "next-intl failed to resolve locale messages or middleware locale flow. Verify middleware localePrefix, ensure locale exists, and check src/locales/<locale>/index.ts exports.",
    };
  }

  if (tags.includes("route-404-or-not-found")) {
    return {
      area: "routing",
      hint:
        "Request is hitting a locale segment but route is not resolved. Confirm you have src/app/[locale]/page.tsx and that middleware forwards locale correctly.",
    };
  }

  if (tags.includes("module-resolution") || tags.includes("build-or-compile-failure")) {
    return {
      area: "build",
      hint:
        "Module resolution/build compilation issue. Look at exact stack/filePath and the original message for the missing module path.",
    };
  }

  return {
    area: "unknown",
    hint: "Inspect filePath/stack to locate the exact line, then verify route/intl/filesystem assumptions.",
  };
}

export const errorLogger = {
  log: (error: unknown) => {
    const detail = extractErrorDetails(error);
    // eslint-disable-next-line no-console
    console.error(formatErrorLog(detail));
    return detail;
  },

  logWithContext: (error: unknown, context: Record<string, unknown>) => {
    const detail = extractErrorDetails(error);
    // eslint-disable-next-line no-console
    console.error(formatErrorLog(detail));
    // eslint-disable-next-line no-console
    console.error(`${"─".repeat(78)}`);
    // eslint-disable-next-line no-console
    console.error("📦 Context:", JSON.stringify(context, null, 2));
    // eslint-disable-next-line no-console
    console.error(`${"═".repeat(78)}`);
    return { ...detail, context };
  },

  summary: (error: unknown) => {
    const detail = extractErrorDetails(error);
    const emoji =
      {
        low: "ℹ️",
        medium: "⚠️",
        high: "🚨",
        critical: "💀",
      }[detail.severity] || "❓";
    // eslint-disable-next-line no-console
    console.log(`${emoji} [${detail.severity}] ${detail.message}`);
    return detail;
  },
};
