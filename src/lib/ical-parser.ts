export type ICalEvent = {
  uid: string;
  start: string;
  end: string;
  summary: string;
};

/**
 * Decode RFC 5545 line folding: any CRLF (or LF) followed by a SPACE or TAB
 * is a continuation of the previous line. We unfold first, then parse.
 */
function unfoldICal(content: string): string {
  return content.replace(/\r?\n[ \t]/g, "");
}

export function parseICal(icsContent: string): ICalEvent[] {
  const unfolded = unfoldICal(icsContent);
  const blocks = unfolded.split("BEGIN:VEVENT").slice(1);
  return blocks
    .map((block) => {
      const eventBlock = block.split("END:VEVENT")[0] ?? block;
      const uid = extractField(eventBlock, "UID") ?? cryptoRandomId();
      const start = normalizeDate(extractField(eventBlock, "DTSTART"));
      const end = normalizeDate(extractField(eventBlock, "DTEND"));
      const summary = extractField(eventBlock, "SUMMARY") ?? "Reservation";
      if (!start || !end) return null;
      return { uid, start, end, summary };
    })
    .filter((item): item is ICalEvent => item !== null);
}

function cryptoRandomId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

function extractField(block: string, key: string): string | null {
  const lines = block.split(/\r?\n/).map((rawLine) => rawLine.trim());
  const line = lines.find(
    (rawLine) => rawLine.startsWith(`${key}:`) || rawLine.startsWith(`${key};`),
  );
  if (!line) return null;
  const colonIndex = line.indexOf(":");
  if (colonIndex < 0) return null;
  return line.slice(colonIndex + 1).trim();
}

function normalizeDate(value: string | null): string | null {
  if (!value) return null;
  const dateOnly = value.slice(0, 8);
  if (dateOnly.length !== 8 || !/^\d{8}$/.test(dateOnly)) return null;
  return `${dateOnly.slice(0, 4)}-${dateOnly.slice(4, 6)}-${dateOnly.slice(6, 8)}`;
}
