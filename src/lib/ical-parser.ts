export type ICalEvent = {
  uid: string;
  start: string;
  end: string;
  summary: string;
};

export function parseICal(icsContent: string): ICalEvent[] {
  const blocks = icsContent.split("BEGIN:VEVENT").slice(1);
  return blocks
    .map((block) => {
      const uid = extractField(block, "UID") ?? crypto.randomUUID();
      const start = normalizeDate(extractField(block, "DTSTART"));
      const end = normalizeDate(extractField(block, "DTEND"));
      const summary = extractField(block, "SUMMARY") ?? "Reservation";
      if (!start || !end) return null;
      return { uid, start, end, summary };
    })
    .filter((item): item is ICalEvent => item !== null);
}

function extractField(block: string, key: string): string | null {
  const line = block
    .split("\n")
    .map((rawLine) => rawLine.trim())
    .find((rawLine) => rawLine.startsWith(`${key}:`) || rawLine.startsWith(`${key};`));
  if (!line) return null;
  const parts = line.split(":");
  return parts.length > 1 ? parts.slice(1).join(":").trim() : null;
}

function normalizeDate(value: string | null): string | null {
  if (!value) return null;
  const dateOnly = value.slice(0, 8);
  if (dateOnly.length !== 8) return null;
  return `${dateOnly.slice(0, 4)}-${dateOnly.slice(4, 6)}-${dateOnly.slice(6, 8)}`;
}
