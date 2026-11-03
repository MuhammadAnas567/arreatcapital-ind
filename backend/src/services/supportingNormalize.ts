export type SupportingOption = {
  label: string;
  value: string;
};

function extractRawList(body: unknown): unknown[] {
  if (Array.isArray(body)) return body;
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>;
    if (Array.isArray(record.results)) return record.results;
    if (Array.isArray(record.data)) return record.data;
  }
  return [];
}

function trimText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function usesIdAsValue(type: string): boolean {
  return type === 'property-type' || type === 'listing-agents';
}

function dedupeByValue(options: SupportingOption[]): SupportingOption[] {
  const seen = new Set<string>();
  const result: SupportingOption[] = [];

  for (const option of options) {
    if (seen.has(option.value)) continue;
    seen.add(option.value);
    result.push(option);
  }

  return result;
}

export function normalizeSupportingList(
  type: string,
  body: unknown
): SupportingOption[] {
  const items = extractRawList(body);
  const options: SupportingOption[] = [];

  for (const item of items) {
    if (!item || typeof item !== 'object') continue;

    const record = item as Record<string, unknown>;
    const label = trimText(record.text);
    if (!label) continue;

    let value: string;
    if (usesIdAsValue(type)) {
      const id = record.id;
      if (id === null || id === undefined || String(id).trim() === '') continue;
      value = String(id).trim();
    } else {
      value = label;
    }

    options.push({ label, value });
  }

  return dedupeByValue(options);
}
