export const getEmbedUrl = (url: string): string | null => {
  if (!url) return null;

  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);

  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}