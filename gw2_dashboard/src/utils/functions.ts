export function SecToHours(value: number){

    let hours = Math.floor(value/3600);
    let minutes = Math.floor(value%3600 / 60);
    let seconds = value - (hours * 3600) - (minutes * 60);

    let format = `${hours}h ${minutes}min ${seconds}sec`;

    return format;
}

export const chunk = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};