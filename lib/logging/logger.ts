type LogLevel = "debug" | "info" | "warn" | "error";
interface LogFields { requestId?: string; userId?: string; operation: string; status?: "success" | "failure"; durationMs?: number; errorCode?: string; [key: string]: unknown; }
const SENSITIVE_KEYS = new Set(["password","passwordHash","password_hash","token","accessToken","access_token","refreshToken","refresh_token","sessionToken","session_token","apiKey","api_key","secret"]);
export function redact<T extends Record<string, unknown>>(fields: T): T { const clean = { ...fields }; for (const key of Object.keys(clean)) if (SENSITIVE_KEYS.has(key)) (clean as Record<string, unknown>)[key] = "[redacted]"; return clean; }
function write(level: LogLevel, fields: LogFields) { const line = JSON.stringify({ level, time: new Date().toISOString(), ...redact(fields) }); if (level === "error") console.error(line); else if (level === "warn") console.warn(line); else console.log(line); }
export const logger = { debug: (fields: LogFields) => write("debug", fields), info: (fields: LogFields) => write("info", fields), warn: (fields: LogFields) => write("warn", fields), error: (fields: LogFields) => write("error", fields) };
