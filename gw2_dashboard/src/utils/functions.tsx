export function SecToHours(value: number) {

  let hours = Math.floor(value / 3600);
  let minutes = Math.floor(value % 3600 / 60);
  let seconds = value - (hours * 3600) - (minutes * 60);

  let format = `${hours.toLocaleString()} hours ${minutes} minutes ${seconds} seconds`;

  return format;
}

export const convertGoldFormat = (value: number) => {
  let gold = Math.floor(value / 10000);
  let silver = Math.floor((value % 10000) / 100);
  let copper = value - gold * 10000 - silver * 100;

  return (
    <span className="flex items-center gap-1">
      {!!gold && <span className="flex items-center">
        <span>{gold}</span>
        <span className="sprite-gold"></span>
      </span>}
      {!!silver && <span className="flex items-center">
        <span>{silver}</span>
        <span className="sprite-silver"></span>
      </span>}
      {!!copper && <span className="flex items-center">
        <span>{copper}</span>
        <span className="sprite-copper"></span>
      </span>}
    </span>
  )
}

export const chunk = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};