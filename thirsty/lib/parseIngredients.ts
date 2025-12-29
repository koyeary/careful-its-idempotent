const UNIT_TO_ML: Record<string, number> = {
  oz: 29.5735,
  cl: 10,
  cup: 240,
  tbsp: 15,
  tsp: 5,
  dash: 0.5,
};

function parseFraction(str: string): number | null {
  // handle "1 1/2", "1/2", "2"
  const trimmed = str.trim();
  const parts = trimmed.split(" ");
  let total = 0;

  for (const part of parts) {
    if (part.includes("/")) {
      const [num, den] = part.split("/");
      const n = Number(num);
      const d = Number(den);
      if (!isNaN(n) && !isNaN(d) && d !== 0) total += n / d;
    } else {
      const n = Number(part);
      if (!isNaN(n)) total += n;
    }
  }

  return total || null;
}

export function standardizeMeasure(raw: string): number | undefined {
  const lower = raw.toLowerCase();
  const match = lower.match(/([\d\/.\s]+)\s*([a-z]+)?/);
  if (!match) return;
  const [, qtyStr, unitRaw] = match;
  const qty = parseFraction(qtyStr);
  if (qty == null || !unitRaw) return;

  const unitKey = unitRaw.replace(/\./g, "");
  const factor = UNIT_TO_ML[unitKey as keyof typeof UNIT_TO_ML];
  if (!factor) return;

  return qty * factor;
}
