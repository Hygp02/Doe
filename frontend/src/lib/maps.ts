export function buildMapUrl(address: string): string {
  const encoded = encodeURIComponent(address)
  return `https://www.google.com/maps/search/?api=1&query=${encoded}`
}
