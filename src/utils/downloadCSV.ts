import type { Character } from '../app/home/page';

export function downloadCSV(items: Character[]): void {
  if (items.length === 0) return;
  const headers = ['Name', 'Status', 'Species', 'URL'];
  const rows = items.map((item) => [
    `"${item.name}"`,
    `"${item.status}"`,
    `"${item.species}"`,
    `"https://rickandmortyapi.com/api/character/${item.id}"`,
  ]);
  const csv =
    headers.join(',') + '\n' + rows.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${items.length}_items.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
