export function timeAgo(date: string) {
  const now = new Date() as unknown as number;
  const pastDate = new Date(date) as unknown as number;
  const seconds = Math.floor((now - pastDate) / 1000);

  let interval = seconds / 31_536_000;
  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2_592_000;
  if (interval > 1) {
    return `${Math.floor(interval)} months ago`;
  }
  interval = seconds / 86_400;
  if (interval > 1) {
    return `${Math.floor(interval)} days ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}
