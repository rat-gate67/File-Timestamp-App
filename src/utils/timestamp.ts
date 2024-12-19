export function generateTimestamp(): string {
  return new Date().toISOString();
}

export function verifyTimestamp(timestamp: string): boolean {
  try {
    const date = new Date(timestamp);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
}