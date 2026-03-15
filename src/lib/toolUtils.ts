export function safeTextFromError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unexpected error";
}

export function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
}

export function normalizeSpaces(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, " "))
    .join("\n");
}

export function toPdfBlob(bytes: Uint8Array): Blob {
  const normalized = new Uint8Array(bytes);
  return new Blob([normalized.buffer], { type: "application/pdf" });
}

export function parsePageSelection(input: string, totalPages: number): number[] {
  const values = new Set<number>();
  const chunks = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  for (const chunk of chunks) {
    if (chunk.includes("-")) {
      const [startRaw, endRaw] = chunk.split("-").map((v) => Number.parseInt(v.trim(), 10));
      if (!Number.isFinite(startRaw) || !Number.isFinite(endRaw)) {
        throw new Error(`Invalid range: ${chunk}`);
      }
      const start = Math.min(startRaw, endRaw);
      const end = Math.max(startRaw, endRaw);
      if (start < 1 || end > totalPages) {
        throw new Error(`Range ${chunk} is outside 1-${totalPages}`);
      }
      for (let page = start; page <= end; page += 1) {
        values.add(page - 1);
      }
    } else {
      const page = Number.parseInt(chunk, 10);
      if (!Number.isFinite(page) || page < 1 || page > totalPages) {
        throw new Error(`Page ${chunk} is outside 1-${totalPages}`);
      }
      values.add(page - 1);
    }
  }

  return [...values].sort((a, b) => a - b);
}
