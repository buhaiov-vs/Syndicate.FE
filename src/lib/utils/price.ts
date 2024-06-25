export function getPriceHumanFriendly(price: number | null | undefined): string {
  if(!price) {
    return "";
  }
  
  const priceString = Intl.NumberFormat().format(price).toString()
  const parts = priceString.split('.');

  return `${parts[0]}.${parts.length === 1 ? '00' : parts[1].padEnd(2, '0')}`;
}